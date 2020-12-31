/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1607977578318_835';

  // add your middleware config here
  config.middleware = [ 'httpLog' ];
  // 这个httpLog就是上面引入的中间件,这里定义的该中间件参数可以在中间件的options中获取到
  config.httpLog = {
    type: 'all'
  };

  config.allowHosts = [ 'localhost:8000', '127.0.0.1:8000', '47.111.168.36', 'house.zjutshideshan.cn' ];

  config.interfaceLimit = {
    maxCount: 5, // 最多请求次数
    time: 3 * 1000 // 间隔时间
  };

  config.interfaceCache = {
    expire: 10,
    include: [ '/api/user/detail' ]
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 对以.html结尾的文件采用ejs模板引擎，并且对html文件存放的位置进行配置
  config.view = {
    mapping: {
      '.html': 'ejs'
    },
    // root: path.join(appInfo.baseDir, 'app/html')  配置htnl存放的单一路径
    // 也可以配置html文件存放的多个路径
    root: [
      path.join(appInfo.baseDir, 'app/html'),
      path.join(appInfo.baseDir, 'app/view'),
    ].join(',')
  };

  // ejs的配置
  config.ejs = {
    delimiter: '%'
  };

  // 静态资源配置
  config.static = {
    // 默认前缀是public
    prefix: '/assets/',
    // 设置静态资源存放的位置，默认存放在app/public目录下
    dir: path.join(appInfo.baseDir, 'app/assets')
  };

  config.session = {
    // 设置session的键值
    key: 'SDS_SESSION',
    // 是否只允许在服务端操作session，默认为true
    httpOnly: true,
    // session的过期时间
    maxAge: 1000 * 5,
    // renew默认为false；当为true时，如果用户长时间都在访问站点，就会重置 Session 的有效期
    renew: true
  };

  // 配置auth插件
  config.auth = {
    // 排除不使用插件的路由
    exclude: [ '/api/user/login', '/api/user/register' ]
  };

  // 配置egg-mysql插件
  config.mysql = {
    app: true,
    agent: false,
    client: {
      host: '47.111.168.36',
      port: '3306',
      user: 'root',
      password: 'shideshan666',
      database: 'egg_house'
    }
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '47.111.168.36',
    port: '3306',
    user: 'root',
    password: 'shideshan666',
    database: 'egg_house',
    define: {
      timestamps: false,
      freezeTableName: true
    }
  };

  // secret是自定义的密钥
  config.jwt = {
    secret: 'shideshan'
  };

  // redis设置，db: 0表示默认的redis数据库
  config.redis = {
    client: {
      port: 6379,
      host: '47.111.168.36',
      password: 'shideshan666',
      db: 0
    }
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    salt: 'egg',
    redisExpire: 60 * 60 * 24
  };

  return {
    ...config,
    ...userConfig,
  };
};
