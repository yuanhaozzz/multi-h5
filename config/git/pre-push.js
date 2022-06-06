const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const pages = require("../../src/build");

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
  Object.keys(pages).forEach((page) => {
    file += `
    - name: 打包页面：${page} 
    uses: easingthemes/ssh-deploy@v2.0.7
    env:
      SSH_PRIVATE_KEY: \${{ secrets.DEPLOY_KEY }}
      ARGS: "-avzr --delete"
      SOURCE: "dist/${page}"
      REMOTE_HOST: \${{ secrets.SSH_HOST }}
      REMOTE_USER: \${{ secrets.SSH_USERNAME }}
      TARGET: "/root/web/multi-h5/dist/"
    `;
  });
  // 重写deploy配置文件
  fs.writeFileSync(
    path.join(__dirname, "../../.github/workflows", "deploy.yml"),
    file
  );
}

resetYmlFile();
