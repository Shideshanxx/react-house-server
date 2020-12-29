'use strict';

const Subscription = require('egg').Subscription;

class getInfo extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    // 当type为all时，每一个进程都会执行该定时任务，当type为worker时，master进程会指定一个worker进程执行该定时任务；
    // 定时方式除了interval还有cron，下面这个十个小时打印一次
    return {
      // interval: 1000 * 60 * 10,
      cron: '0 0 */10 * * *',
      type: 'worker'
    };
  }
  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const info = this.ctx.info;
    console.log(Date.now(), info);
  }
}

module.exports = getInfo;
