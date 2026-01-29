/**
 * Node 下运行：node applyPrefixFromJson.js
 * 按 fileList_text测试.json 的顺序：
 * 1. 给 img 下文件夹名加前缀（0_、1_、2_...）；通过 folder 或「等级_」后的显示名匹配
 * 2. 给文件夹内文件加前缀，并把文件名改为 序号_data.text.扩展名（不再用 c1.png 等）
 * 只处理 JSON 中出现的文件夹；未在 JSON 中匹配到的文件夹会跳过。执行完后可运行 node v1.js 刷新 fileList.json。
 */
const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(__dirname, 'img');
const SOURCE_JSON = path.join(__dirname, 'fileList_text测试.json');

/** 解析「等级_显示名」：无下划线时 display 为原名 */
function parseLevelPrefix(name) {
  const i = name.indexOf('_');
  if (i === -1) return { display: name };
  return { display: name.slice(i + 1) || name };
}

/** 当前磁盘上的文件夹名 -> 对应的 JSON 项索引（通过 folder 或 display 匹配） */
function findFolderIndex(dirNames, list) {
  const map = new Map();
  for (let i = 0; i < list.length; i++) {
    const folder = list[i].folder;
    map.set(folder, i);
    const display = parseLevelPrefix(folder).display;
    if (display !== folder) map.set(display, i);
  }
  const dirToIndex = new Map();
  for (const dir of dirNames) {
    const display = parseLevelPrefix(dir).display;
    if (map.has(dir)) dirToIndex.set(dir, map.get(dir));
    else if (map.has(display)) dirToIndex.set(dir, map.get(display));
  }
  return dirToIndex;
}

/** 文件名中去掉非法字符（保留中文、英文、数字、-_） */
function safeFileName(name) {
  return name.replace(/[/\\:*?"<>|]/g, '_').trim() || 'file';
}

function main() {
  const raw = fs.readFileSync(SOURCE_JSON, 'utf8');
  const list = JSON.parse(raw);
  if (!Array.isArray(list)) throw new Error('JSON 应为数组');

  const dirNames = fs.readdirSync(IMG_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name);

  const dirToIndex = findFolderIndex(dirNames, list);

  for (const currentDirName of dirNames) {
    const index = dirToIndex.get(currentDirName);
    if (index == null) {
      console.log('跳过（未在 JSON 中匹配）:', currentDirName);
      continue;
    }
    const item = list[index];
    const newFolderName = index + '_' + item.folder;
    const currentDirPath = path.join(IMG_DIR, currentDirName);

    if (currentDirName !== newFolderName) {
      const newDirPath = path.join(IMG_DIR, newFolderName);
      fs.renameSync(currentDirPath, newDirPath);
      console.log('文件夹:', currentDirName, '->', newFolderName);
    }

    const finalDirPath = path.join(IMG_DIR, newFolderName);
    const files = fs.readdirSync(finalDirPath, { withFileTypes: true })
      .filter(e => e.isFile())
      .map(e => e.name);
    const fileSet = new Set(files);

    // 第一轮：全部先改成临时名，避免新名与旧名冲突
    for (let j = 0; j < item.data.length; j++) {
      const d = item.data[j];
      const oldName = d.img;
      const ext = path.extname(oldName);
      if (!fileSet.has(oldName)) {
        console.warn('  文件不存在，跳过:', oldName, 'in', item.folder);
        continue;
      }
      const tempName = '__temp_' + j + ext;
      const oldPath = path.join(finalDirPath, oldName);
      const tempPath = path.join(finalDirPath, tempName);
      fs.renameSync(oldPath, tempPath);
      fileSet.delete(oldName);
      fileSet.add(tempName);
    }

    // 第二轮：临时名改为 序号_data.text.扩展名
    for (let j = 0; j < item.data.length; j++) {
      const d = item.data[j];
      const ext = path.extname(d.img);
      const text = safeFileName(d.text);
      const newName = j + '_' + text + ext;
      const tempName = '__temp_' + j + ext;
      const tempPath = path.join(finalDirPath, tempName);
      const newPath = path.join(finalDirPath, newName);
      if (fs.existsSync(tempPath)) {
        fs.renameSync(tempPath, newPath);
        console.log('  文件:', d.img, '->', newName);
      }
    }
  }

  console.log('完成。');
}

main();
