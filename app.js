'use strict';

module.exports = app => {
  const store = {};

  app.sessionStore = {
    // get方法用来获取session
    async get(key) {
      console.log('--store--', store);
      return store[key];
    },
    // set 方法用来设置session
    async set(key, value) {
      store[key] = value;
    },
    // destroy用来清除session
    async destroy(key) {
      store[key] = null;
    }
  };

  // 注意插件顺序，先判断是否来自本站的请求，再判断接口是否存在，再判断用户是否存在
  const mids = app.config.coreMiddleware;
  app.config.coreMiddleware = [ ...mids, ...[
    'interfaceLimit',
    'allowHosts',
    'notFound',
    'auth',
    'interfaceCache'
  ] ];
};
