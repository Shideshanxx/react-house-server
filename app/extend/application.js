'use strict';

const path = require('path');
// 分为对方法的扩展和对属性的扩展
module.exports = {
  // 方法扩展
  package(key) {
    const pack = getPack();
    return key ? pack[key] : pack;
  },

  // 属性扩展
  get allPackage() {
    return getPack();
  }
};

function getPack() {
  // process.cwd()为当前Node.js进程执行时的文件夹地址——工作目录，即该项目根路径
  const filePath = path.join(process.cwd(), 'package.json');
  const pack = require(filePath);
  return pack;
}
