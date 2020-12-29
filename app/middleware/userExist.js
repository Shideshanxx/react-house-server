'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const user = await ctx.service.user.getUser(ctx.username);
    // 如果数据库找不到该用户
    if (!user) {
      ctx.body = {
        status: 500,
        errMsg: '用户不存在'
      };
      return;
    }
    await next();
  };
};
