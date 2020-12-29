'use strict';

module.exports = {
  // 在请求头新增一个request.token等价于request.header.token
  get token() {
    // 这里this就是request
    // console.log('header', this.header);
    // this.get()可以获取到header里面的一些属性，这里返回新增的token属性
    return this.get('token');
  }
};
