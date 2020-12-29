'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const Orders = app.model.define('orders', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderNumber: STRING(20),
    userId: INTEGER,
    houseId: INTEGER,
    isPayed: {
      type: INTEGER,
      defaultValue: 0
    },
    createTime: {
      type: DATE,
      get() {
        return new Date(this.getDataValue('createTime')).getTime();
      }
    },
    updateTime: {
      type: DATE,
      get() {
        return new Date(this.getDataValue('updateTime')).getTime();
      }
    }
  });

  // 因为民宿和图片进行了关联，只需要把订单和民宿进行关联就可以获取到民宿下面的图片
  Orders.associate = () => {
    // 订单和房屋是多对一的关系,使用belongsTo
    // 并对关联的表app.model.House 起一个别名——'house'
    app.model.Orders.belongsTo(app.model.House, { foreignKey: 'houseId', as: 'house' });
  };

  return Orders;
};
