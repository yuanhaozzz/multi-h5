"use strict";

const path = require("path");
const fs = require("fs");
const pages = require("../src/build");
const getPublicUrlOrPath = require("react-dev-utils/getPublicUrlOrPath");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === "development",
  require(resolveApp("package.json")).homepage,
  process.env.PUBLIC_URL
);

const buildPath = "dist";

const moduleFileExtensions = [".js", ".jsx", ".json", ".scss"];

const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

const getModule = () => {
  const moduleList = [];
  Object.keys(pages).forEach((module) => {
    moduleList.push(resolveModule(resolveApp, `src/pages/${module}/index`));
  });

  return moduleList;
};

module.exports = {
  dotenv: resolveApp(".env"),
  appPath: resolveApp("."),
  appBuild: resolveApp(buildPath),
  appPublic: resolveApp("public"),
  public: resolveApp("public"),
  appHtml: resolveApp("public/index.html"),
  appIndexJs: getModule(),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  src: resolveApp("src"),
  appTsConfig: resolveApp("tsconfig.json"),
  appJsConfig: resolveApp("jsconfig.json"),
  yarnLockFile: resolveApp("yarn.lock"),
  testsSetup: resolveModule(resolveApp, "src/setupTests"),
  proxySetup: resolveApp("src/setupProxy.js"),
  appNodeModules: resolveApp("node_modules"),
  appWebpackCache: resolveApp("node_modules/.cache"),
  appTsBuildInfoFile: resolveApp("node_modules/.cache/tsconfig.tsbuildinfo"),
  swSrc: resolveModule(resolveApp, "src/service-worker"),
  publicUrlOrPath,
};

module.exports.moduleFileExtensions = moduleFileExtensions;
