'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Imgs = app.model.define('imgs', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    url: STRING(500),
    houseId: INTEGER,
    createTime: DATE
  });

  return Imgs;
};
