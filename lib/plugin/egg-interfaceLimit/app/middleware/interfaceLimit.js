'use strict';

// eslint-disable-next-line jsdoc/require-param
/**
 * 思路：3秒内最多允许3个接口请求
 * 1. 设置计数器，每次请求加1；保存起始时间；
 * 2. 如果在3秒内，计数器大于3，则提示请求频繁；计数器清零，起始时间修改为当前时间
 * 3. 如果在3秒内，计数器小于3，计数器自增；
 * 4. 如果大于3秒，计数器清零，起始时间修改为当前时间
 */
module.exports = options => {
  let count = 0;
  let firstTime = new Date().getTime();

  return async (ctx, next) => {
    if (new Date().getTime() - firstTime < options.time) {
      if (count >= options.maxCount) {
        count = 0;
        firstTime = new Date().getTime();
        ctx.body = {
          status: 500,
          errMsg: '请求太频繁'
        };
        return;
      }
      count++;
      await next();
    } else {
      count = 0;
      firstTime = new Date().getTime();
      await next();
    }
  };
};
