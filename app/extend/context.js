'use strict';
// 和application类似，分为方法扩展和属性扩展
module.exports = {
  // get请求和post请求获取参数的方式不一样，现扩展一种方法来统一获取参数。
  // 在controller中通过ctx.params()访问该扩展；
  params(key) {
    // 这里的this就是ctx
    const method = this.request.method;
    if (method === 'GET') {
      // 当为get请求，通过ctx.query的方式获取参数
      return key ? this.query[key] : this.query;
    }
    // 若不是get请求，通过ctx.request.body的方式获取参数
    return key ? this.request.body[key] : this.request.body;
  },

  // 属性扩展
  get allParams() {
    const method = this.request.method;
    if (method === 'GET') {
      return this.query;
    }
    return this.request.body;
  },

  // 从请求头token中解析出username
  get username() {
    const token = this.request.header.token;
    // 用jwt.verify(token, 密钥)的方式解析出token里面的payload
    const tokenCache = token ? this.app.jwt.verify(token, this.app.config.jwt.secret) : undefined;
    return tokenCache ? tokenCache.username : undefined;
  },

  get userId() {
    const token = this.request.header.token;
    const tokenCache = token ? this.app.jwt.verify(token, this.app.config.jwt.secret) : undefined;

    return tokenCache ? tokenCache.id : undefined;
  }
};
