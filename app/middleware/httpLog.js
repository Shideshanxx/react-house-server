'use strict';

const dayjs = require('dayjs');
const fs = require('fs');

module.exports = () => {
  return async (ctx, next) => {
    const sTime = Date.now();
    const startTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    const req = ctx.request;
    await next();
    const log = {
      method: req.method,
      url: req.url,
      data: req.body,
      startTime,
      endTime: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      timeLength: Date.now() - sTime
    };
    const data = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss') + ' [httpLog] ' + JSON.stringify(log) + '\r\n';
    // ctx.app.baseDir为项目的路径，把日志写入/httpLog.log里面
    fs.appendFileSync(ctx.app.baseDir + '/httpLog.log', data);
  };
};
