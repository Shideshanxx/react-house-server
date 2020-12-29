'use strict';

const md5 = require('md5');
const BaseController = require('./base');

class UserController extends BaseController {
  async jwtSign({ id, username }) {
    const { app } = this;
    // jwt可以从app中获取到
    // jwt.sign接收两个参数，第一个是peyload，第二个是密钥
    const token = app.jwt.sign({
      id,
      username
    }, app.config.jwt.secret);

    // 在注册和登陆时设置session，在中间件通过session里面是否有username来判断是否登录；退出登录时清空session；session也可以自定义过期时间
    // ctx.session[username] = 1;

    // 将登录判定条件改成redis，把token存到redis，对应username键，过期时间在config.default.js中的userConfig中设置
    await app.redis.set(username, token, 'EX', app.config.redisExpire);

    return token;
  }

  parseResult(ctx, result) {
    return {
      ...ctx.helper.unPick(result.dataValues, [ 'password' ]),
      createTime: ctx.helper.timestamp(result.createTime),
    };
  }

  async register() {
    const { ctx, app } = this;
    const params = ctx.params();
    const user = await ctx.service.user.getUser(params.username);
    if (user) {
      this.error('用户已经存在');
      return;
    }

    // md5可以反解密，所以在password末尾加一个自定义字符，如此反解密到的也不是真实密码
    const result = await ctx.service.user.add({
      ...params,
      password: md5(params.password + app.config.salt),
      createTime: ctx.helper.timer()
    });
    // 注册成功之后不需要把密码返回给前端
    // 因为Sequelize的包装，result.createTime也可以访问到createTime，而不需要result.dataValues.createTime(这个当然也可以，但比较麻烦)
    if (result) {
      const token = await this.jwtSign({
        id: result.id,
        username: result.username
      });
      this.success({
        ...this.parseResult(ctx, result),
        token
      });
    } else {
      this.error('注册失败');
    }
  }

  async login() {
    const { ctx } = this;
    const { username, password } = ctx.params();
    const user = await ctx.service.user.getUser(username, password);
    if (user) {
      const token = await this.jwtSign({
        id: user.id,
        username: user.username
      });
      this.success({
        ...this.parseResult(ctx, user),
        token
      });
    } else {
      // 这里有一点bug，就是username正确，password错误时，接口依然返回的是用户不存在
      this.error('用户不存在');
    }
  }

  // 在中间件会判断用户是否存在
  async detail() {
    const { ctx } = this;
    // 由于对context进行了扩展，ctx.username取的就是token里面的username
    const user = await ctx.service.user.getUser(ctx.username);
    this.success({
      ...this.parseResult(ctx, user)
    });
  }

  async logout() {
    const { ctx, app } = this;
    try {
      // 清空session
      // ctx.session[ctx.username] = null;

      // 清空redis
      await app.redis.del(ctx.username);
      this.success('ok');
    } catch (error) {
      this.error('退出登录失败');
    }
  }

  async edit() {
    const { ctx } = this;
    const result = ctx.service.user.edit({
      ...ctx.params(),
      updateTime: ctx.helper.timer(),
      sign: ctx.helper.escape(ctx.params('sign'))
    });
    this.success(result);
  }
}

module.exports = UserController;
