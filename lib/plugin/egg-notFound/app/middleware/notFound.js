'use strict';

module.exports = () => {
  return async (ctx, next) => {
    // filter以数组格式返回匹配到的数据
    const flag = ctx.app.router.stack.filter(item => {
      return item.regexp.test(ctx.request.url);
    });
    if (flag.length) {
      await next();
    } else {
      ctx.body = {
        status: 404,
        errMsg: '接口' + ctx.request.url + '不存在'
      };
    }
  };
};
