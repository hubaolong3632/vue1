/**
 * Node 下运行：node v1.js
 * 遍历 img/ 下的一级子目录，生成 fileList.json（与 index.html 展示格式一致）。
 * - 只保留「磁盘上仍存在的文件夹」，已删的从列表移除。
 * - 每个文件夹都会按磁盘重新扫描：内部文件若改了前缀/名称或顺序，会同步更新到 fileList.json。
 *
 * 命名规则：等级_显示名（如 -1_测试一、2_测试二）。等级越小越靠前；生成的 text/data.text 只用「_」后面的部分，不含此前缀。
 */
const fs = require('fs');
const path = require('path');

const TARGET_DIR = './img';
const OUTPUT_JSON = './fileList.json';

/** 解析「等级_显示名」：返回 { sortKey: 数字, display: 显示名 }。无下划线时 display 为原名，sortKey 为 Infinity（排到最后） */
function parseLevelPrefix(name) {
  const i = name.indexOf('_');
  if (i === -1) return { sortKey: Infinity, display: name };
  const sortKey = Number(name.slice(0, i));
  const display = name.slice(i + 1);
  return { sortKey: Number.isNaN(sortKey) ? Infinity : sortKey, display: display || name };
}

function readDir(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
      if (err) {
        if (err.code === 'ENOENT') return resolve([]);
        return reject(err);
      }
      resolve(entries);
    });
  });
}

/** 读取已有 fileList.json，不存在或解析失败则返回 [] */
function loadExistingList() {
  try {
    if (fs.existsSync(OUTPUT_JSON)) {
      const raw = fs.readFileSync(OUTPUT_JSON, 'utf8');
      const list = JSON.parse(raw);
      return Array.isArray(list) ? list : [];
    }
  } catch (e) {
    console.warn('读取已有 fileList.json 失败，将重新生成:', e.message);
  }
  return [];
}

/** 扫描一级子目录，只返回「文件夹」名列表，并按等级_ 排序（等级越小越前） */
async function getFolderNames() {
  const entries = await readDir(TARGET_DIR);
  const names = entries.filter(e => e.isDirectory()).map(e => e.name);
  return names.sort((a, b) => parseLevelPrefix(a).sortKey - parseLevelPrefix(b).sortKey);
}

/** 扫描某文件夹下的文件，按等级_ 排序，返回 { text, img }[]，text 为 _ 后部分且不含扩展名 */
async function getFilesInFolder(folderName) {
  const dirPath = path.join(TARGET_DIR, folderName);
  const entries = await readDir(dirPath);
  const files = entries.filter(e => e.isFile());
  const withSort = files.map(e => {
    const base = path.basename(e.name, path.extname(e.name));
    const { sortKey, display } = parseLevelPrefix(base);
    return { sortKey, text: display, img: e.name };
  });
  withSort.sort((a, b) => a.sortKey - b.sortKey);
  return withSort.map(({ text, img }) => ({ text, img }));
}

async function main() {
  const existingList = loadExistingList();
  const allFolderNames = await getFolderNames();
  const foldersOnDisk = new Set(allFolderNames);
  const existingFolders = new Set(existingList.map(item => item.folder));

  // 已删掉的文件夹（仅用于日志）
  const removed = existingList.filter(item => !foldersOnDisk.has(item.folder));
  const newFolderNames = allFolderNames.filter(name => !existingFolders.has(name));

  // 所有磁盘上的文件夹都重新扫描内部文件，保证文件名/顺序与磁盘一致
  const result = [];
  for (const folderName of allFolderNames) {
    const data = await getFilesInFolder(folderName);
    const { display } = parseLevelPrefix(folderName);
    result.push({
      text: display,
      folder: folderName,
      data
    });
  }
  // 已按 getFolderNames 的等级排序，无需再 sort

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2), 'utf8');

  // 输出日志
  console.log('');
  console.log('========== v1.js 扫描结果 ==========');
  console.log('  目标目录:', TARGET_DIR);
  console.log('  输出文件:', OUTPUT_JSON);
  console.log('  当前磁盘文件夹数:', allFolderNames.length);
  console.log('  已从列表移除（文件夹已删）:', removed.length);
  console.log('  新增到列表的文件夹:', newFolderNames.length);
  console.log('  最终列表项数:', result.length);
  console.log('  （每个文件夹内文件均按磁盘重新扫描，前缀/名称/顺序已同步）');
  console.log('--------------------------------------');
  if (removed.length) {
    console.log('  已从列表中移除:');
    removed.forEach((i) => console.log('    -', i.folder));
  }
  if (newFolderNames.length) {
    console.log('  新增到列表:');
    newFolderNames.forEach((name) => {
      const item = result.find(r => r.folder === name);
      console.log('    +', name, item ? '(' + item.data.length + ' 个文件)' : '');
    });
  }
  if (!removed.length && !newFolderNames.length) {
    console.log('  文件夹无增删；内部文件已按磁盘更新。');
  }
  console.log('--------------------------------------');
  console.log('  已写入', OUTPUT_JSON);
  console.log('======================================');
  console.log('');
}

main().catch(err => {
  console.error('v1.js 执行失败:', err.message);
  process.exit(1);
});
