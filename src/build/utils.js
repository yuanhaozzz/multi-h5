const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const paths = require("../../config/paths");

exports.getPageBaseInfo = function (options) {
  const defaultOptions = {
    title: "浩哥的个人主页",
    keywords: "浩哥，浩哥个人主页",
    description: "浩哥，浩哥个人主页",
    injectScript: [],
  };
  return {
    ...defaultOptions,
    ...options,
  };
};

exports.resolve = function (_path) {
  return path.resolve(__dirname, "../../", _path);
};

exports.setHtmlPluginAndEntry = (info) => {
  let htmlPluginList = [];
  let entryList = {};
  for (const [key, value] of Object.entries(info)) {
    const { title } = value;
    // 多页面入口
    entryList[key] = paths.src + "/" + key + "/index.js";
    // 页面打包插件
    htmlPluginList.push(
      new HtmlWebpackPlugin({
        template: paths.public + "/index.html",
        filename: `${key}/index.html`,
        chunks: [key],
        inject: true,
        title,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      })
    );
  }
  return {
    entry: entryList,
    htmlPlugins: htmlPluginList,
  };
};
