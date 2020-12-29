'use strict';

const dayjs = require('dayjs');

module.exports = {
  base64Encode(str = '') {
    return new Buffer(str).toString('base64');
  },
  timer() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  },
  // 转化成时间戳
  timestamp(date) {
    return new Date(date).getTime();
  },
  // 从对象source中排除 数组arr里字符串对应的source的键值对，返回一个新的对象；
  unPick(source, arr) {
    if (Array.isArray(arr)) {
      const obj = {};
      // for in 遍历对象时，i为键值
      for (const i in source) {
        if (!arr.includes(i)) {
          obj[i] = source[i];
        }
      }
      return obj;
    }
  }
};
