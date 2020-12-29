'use strict';

const BaseController = require('./base');

class CommonsController extends BaseController {
  async citys() {
    const { app } = this;
    try {
      const result = await app.curl('https://apis.imooc.com', {
        method: 'post',
        data: {
          icode: 'EE0B7910360B2E2B'
        },
        dataType: 'json',
      });
      if (result.status === 200) {
        this.success(result.data.citys);
      } else {
        this.error('获取城市数据失败');
      }
    } catch (error) {
      this.error('获取城市数据失败');
    }
  }
}

module.exports = CommonsController;
