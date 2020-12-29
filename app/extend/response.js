'use strict';

module.exports = {
  // 在ctx.response上扩展一个token属性，将该属性的参数 赋给接口的rensponse Headers中的x-response-token属性（自定义的一个属性）
  set token(token) {
    this.set('x-response-token', token);
  }
};
