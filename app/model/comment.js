'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Comment = app.model.define('comment', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: INTEGER,
    houseId: INTEGER,
    msg: STRING(500),
    createTime: DATE
  });

  Comment.associate = () => {
    // 评论与用户是多对一的关系，用belongsTo关联
    app.model.Comment.belongsTo(app.model.User, { foreignKey: 'userId' });
  };

  return Comment;
};
