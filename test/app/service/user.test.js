'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('service user test', () => {
  it('test detail', async () => {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.user
    const user = await ctx.service.user.detail(10);
    assert(user);
    assert(user.id === 10);
  });
});
