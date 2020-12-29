'use strict';

const os = require('os');

// 框架扩展，扩展ctx，增加info属性
module.exports = {
  get info() {
    const data = {
      memory: os.totalmem() / 1024 / 1024 / 1024 + 'G',
      platform: os.platform(),
      cpus: os.cpus().length,
      url: this.request.url,
    };
    return data;
  }
};
