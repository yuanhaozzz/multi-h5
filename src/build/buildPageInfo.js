const inquirer = require("inquirer");
const chalk = require("chalk");

const pages = require("./index");

const choicesList = [];

// 处理数据
for (const [key, value] of Object.entries(pages)) {
  choicesList.push(`${key}---${value.title}`);
}

const question = [
  {
    type: "checkbox",
    name: "page",
    message: "请选择要打包的页面",
    choices: choicesList,
  },
];

function handleData(value) {
  const o = {};
  value.map((item) => {
    const key = item.split("---")[0];
    o[key] = pages[key];
  });
  return o;
}

function initProductionData(resolve, reject) {
  inquirer
    .prompt(question)
    .then((value) => {
      if (!value.page.length) {
        console.log(chalk.red("未选择页面，已取消打包"));
        return;
      }
      // 处理成 {views/home: options} 格式
      resolve(handleData(value.page));
    })
    .catch((error) => {
      reject(error);
    });
}

function initDevelopmentData(resolve, reject) {
  if (!Object.keys(pages).length) {
    console.log(chalk.red("没有选择调试页面"));
    reject();
    return;
  }
  // 处理成 {views/home: options} 格式
  resolve(handleData(Object.keys(pages)));
}

module.exports = function () {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "production") {
      initProductionData(resolve, reject);
      return;
    }
    initDevelopmentData(resolve, reject);
  });
};
