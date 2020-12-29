'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const House = app.model.define('house', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: STRING(50),
    info: STRING(150),
    address: STRING(200),
    price: INTEGER,
    publishTime: {
      type: DATE,
      get() {
        return new Date(this.getDataValue('publishTime')).getTime();
      }
    },
    cityCode: STRING(10),
    showCount: INTEGER,
    startTime: {
      type: DATE,
      get() {
        return new Date(this.getDataValue('startTime')).getTime();
      }
    },
    endTime: {
      type: DATE,
      get() {
        return new Date(this.getDataValue('endTime')).getTime();
      }
    }
  });

  // 将民宿表和图片表相关联
  House.associate = () => {
    // 民宿与图片是一对多的关系，用hasMany进行关联
    // 第一个参数是需要关联的表，第二个参数是根据什么参数进行关联
    app.model.House.hasMany(app.model.Imgs, { foreignKey: 'houseId' });
  };

  return House;
};
