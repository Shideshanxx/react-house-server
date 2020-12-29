'use strict';

// sequelize把每个表当成一个模型，所以这个文件名称尽量与表名称保持一致.
// 导出的模型可以在controller、service中通过app.model.User或者ctx.model.User访问，然后利用它的一些方法来操作数据库。
module.exports = app => {
  // number类型在sequelize中是integer
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  // 当使用egg-sequelize插件时，会在app下新增一个model属性
  // model里面有一个define方法，用来定义模型
  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(20),
    password: STRING(64),
    avatar: TEXT('long'),
    phone: STRING(20),
    sign: STRING(300),
    createTime: DATE,
    updateTime: DATE
  });

  return User;
};
