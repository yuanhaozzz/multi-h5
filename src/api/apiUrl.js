// 线上域名
export const online = "";
// 预发布域名
export const beta = "";
// 测试环境域名
export const test = "";
// 本地域名
export const local = "localhost:3333";

const HOST = window.location.host || online;

const ApiMap = {
  [online]: {
    root: "",
  },
  [beta]: {
    root: "",
  },
  [test]: {
    root: "",
  },
  [local]: {
    root: "",
  },
};

export default ApiMap[HOST] || ApiMap[online];
