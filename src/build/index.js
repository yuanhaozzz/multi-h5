const { getPageBaseInfo } = require("./utils");

module.exports = {
  "pages/home": getPageBaseInfo({
    title: "首页",
  }),
  "pages/test": getPageBaseInfo({
    title: "测试页面",
  }),
};
