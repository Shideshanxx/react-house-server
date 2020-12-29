'use strict';

module.exports = options => {
  return async (ctx, next) => {
    // 通过判断session中是否有username来判断是否登录
    // const user = ctx.session[ctx.username];

    const token = ctx.request.token;

    // 从session改成redis里面存储的token
    const redisToken = await ctx.app.redis.get(ctx.username);
    // 当redis里面的token存在，将它与请求头里面的token作比较，两者相等时才说明已登录；
    const user = redisToken ? redisToken === token : redisToken;
    // 该中间件对请求做拦截
    if (!user && !options.exclude.includes(ctx.request.url.split('?')[0])) {
      ctx.body = {
        status: 1001,
        errMsg: '用户未登录'
      };
    } else {
      await next();
    }
  };
};
