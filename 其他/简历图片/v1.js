/**
 * Node 下运行：node v1.js
 * 遍历 img/ 下的一级子目录，生成 fileList.json（与 index.html 展示格式一致）。
 * 若已存在 fileList.json：只保留「磁盘上仍存在的文件夹」；已删掉的文件夹会从列表中移除；新增的文件夹追加在最后。
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

  // 只保留磁盘上仍存在的文件夹，已删掉的从列表中移除
  const keptList = existingList.filter(item => foldersOnDisk.has(item.folder));
  const removed = existingList.filter(item => !foldersOnDisk.has(item.folder));

  const keptFolders = new Set(keptList.map(item => item.folder));
  const newFolderNames = allFolderNames.filter(name => !keptFolders.has(name));

  const newItems = [];
  for (const folderName of newFolderNames) {
    const data = await getFilesInFolder(folderName);
    const { display } = parseLevelPrefix(folderName);
    newItems.push({
      text: display,
      folder: folderName,
      data
    });
  }

  // 合并后按「等级_」统一排序：等级越小越前，无前缀的排最后
  const result = keptList.concat(newItems);
  result.sort((a, b) => parseLevelPrefix(a.folder).sortKey - parseLevelPrefix(b.folder).sortKey);
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2), 'utf8');

  console.log('已写入', OUTPUT_JSON);
  if (removed.length) {
    console.log('已从列表中移除（文件夹已删除）:', removed.map(i => i.folder).join(', '));
  }
  if (newItems.length) {
    console.log('新增文件夹:', newItems.map(i => i.folder).join(', '));
  }
  if (!removed.length && !newItems.length) {
    console.log('无变化。');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
