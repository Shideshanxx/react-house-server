'use strict';

/** 缓存接口
 * 1.  将接口地址作为redis中的key（redis的读取是非常快的）
 * 2.  查询redis，有缓存，则返回数据
 * 3.  没有缓存，将接口结果保存到redis中
 * @param {*} options
 */
module.exports = options => {
  return async (ctx, next) => {
    const { url } = ctx.request;
    const cache = await ctx.app.redis.get(url);

    if (options.include.includes(url)) {
      if (cache) {
        ctx.body = JSON.parse(cache);
        return;
      }
      await next();
      await ctx.app.redis.set(url, JSON.stringify(ctx.response.body), 'EX', options.expire);
    } else {
      await next();
    }
  };
};
