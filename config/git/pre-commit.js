#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const pages = require("../../src/build");

const { logError, execStr, grren } = require("../common");

/**
 * 获取git缓存区内的所有文件和对应的hash
 */
function gitLsFilesStageHash() {
  const res = execStr(`git ls-files --stage`);
  const arrRows = res.split("\n");
  return arrRows.reduce((mapFiles, row) => {
    const res = row.split(/\s|\t/g);
    mapFiles[res[3]] = res[1];
    return mapFiles;
  }, {});
}

/**
 * 获取git当前分支的文件状态
 */
function gitStatus() {
  const res = execStr("git status -s");
  const arrData = res.split("\n");
  return arrData.map((o) => {
    const arrLine = o.split(/\s+/);
    return { flag: arrLine[0], file: arrLine[1] };
  });
}

/**
 * 获取文件变化内容
 * @param {*} hash
 */
function getGitFileChangeContent(hash) {
  if (!hash) return [];
  const changeContent = execStr(`git show ${hash}`);
  const arrChangeContents = changeContent.split("\n");
  return arrChangeContents;
}

/**
 * 检查内容是否冲突
 * @param {*} arrContents
 */
function checkForConflict(arrContents = []) {
  for (let i = 0; i < arrContents.length; i++) {
    // if (arrContents[i].match(/^<<<<<<<\sHEAD|^=======$|^>>>>>>>$/)) {
    //   return i + 1;
    // }
    if (arrContents[i] === "<<<<<<< HEAD") return i + 1;
  }
  return null;
}

/**
 * 检查git缓冲区内的文件是否冲突
 */
function checkGitStageFileConflict() {
  const mapFileHash = gitLsFilesStageHash();
  const arrStatusFiles = gitStatus(); // 获取缓存区内有变化的文件
  const arrChangeFiles = arrStatusFiles
    .filter((o) => !["D", " "].includes(o.flag))
    .map((o) => o.file); // 过滤删除文件
  const arrErrorMsg = [
    `🤯 您的代码里存在冲突标记📌, 请解决冲突后再提交代码！`,
    `📦 冲突代码文件如下: `,
  ];
  arrChangeFiles.forEach((filepath) => {
    const hash = mapFileHash[filepath];
    const arrChangeContents = getGitFileChangeContent(hash);
    const rowNumber = checkForConflict(arrChangeContents);
    if (rowNumber) {
      arrErrorMsg.push(`   📂 ${grren(filepath)}  第${grren(rowNumber)}行`);
    }
  });
  if (arrErrorMsg.length > 2) {
    logError(arrErrorMsg);
    process.exit(1);
  }
}

function checkEslint() {
  const arrErrorMsg = [`🤯 请先解决eslint警告后在提交！`, `📦 警告如下: `];
  let eslint = execStr(`eslint src --ext '.js,.jsx' --fix`);

  const format = eslint.split("\n");
  if (format.length > 1) {
    arrErrorMsg.push(format);
    logError(arrErrorMsg);
    process.exit(1);
  }
}

/**
 * 读取yml模板配置文件
 * @param {*} filename
 */
const readFile = (filename) =>
  fs
    .readFileSync(path.join(__dirname, "..", "yml", filename), "utf8")
    .toString();

/**
 * @description 重写部署文件
 */
function resetYmlFile() {
  let file = readFile("deploy.yml");
  const pageKeys = Object.keys(pages);
  pageKeys.forEach((page) => {
    file += `
      - name: deploy ${page} 
        uses: easingthemes/ssh-deploy@v2.0.7
        env:
          SSH_PRIVATE_KEY: \${{ secrets.DEPLOY_KEY }}
          ARGS: "-avzr --delete"
          SOURCE: "dist/${page}"
          REMOTE_HOST: \${{ secrets.SSH_HOST }}
          REMOTE_USER: \${{ secrets.SSH_USERNAME }}
          TARGET: "/root/web/multi-h5/dist/"`;
  });
  // 重写deploy配置文件
  fs.writeFileSync(
    path.join(__dirname, "../../.github/workflows", "deploy.yml"),
    file
  );

  const status = gitStatus();
  const findYml = status?.find((item) => item.file.includes(".yml"));
  if (findYml) {
    console.log("部署文件配置已修改，请重新提交");
    execStr(`git add deploy.yml`);
  }
}

function check() {
  // 检查冲突
  // checkGitStageFileConflict();
  // eslint检查
  // checkEslint();
  // 重写打包配置文件
  resetYmlFile();
}

check();
