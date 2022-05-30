const { getPageBaseInfo } = require("./utils");

module.exports = {
  "my-home": getPageBaseInfo({
    title: "首页",
  }),
  // "my-test": getPageBaseInfo({
  //   title: "测试页面",
  // }),
  "my-news": getPageBaseInfo({
    title: "news",
  }),
};
