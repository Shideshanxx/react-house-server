'use strict';

const BaseService = require('./base');

class HouseService extends BaseService {
  commonAttr(app) {
    return {
      order: [
        [ 'showCount', 'DESC' ]
      ],
      attributes: {
        exclude: [ 'startTime', 'endTime', 'publishTime' ]
      },
      include: [
        {
          model: app.model.Imgs,
          limit: 1,
          attributes: [ 'url' ]
        }
      ]
    };
  }
  // 获取热门民宿
  async hot() {
    return this.run(async (ctx, app) => {
      // 根据showCount降序返回四条数据，返回数据里面去掉一些属性, 用include设置伴随返回的关联表里面的一些数据
      const result = await ctx.model.House.findAll({
        ...this.commonAttr(app),
        limit: 6
      });

      return result;
    });
  }

  // 查询民宿
  // 默认前端的pageNum从1开始算，但是后端是从0开始的，所以这里需要设置偏移量
  async search(params) {
    return this.run(async (ctx, app) => {
      //  [Op.lte]: 10,              // 意思是id <= 10
      //  [Op.gte]: 6,               // 意思是id >= 6
      // Op.like 用于模糊查询
      const { lte, gte, like } = app.Sequelize.Op;
      //  为了符合业务要求，where规则里面的startTime 要<= params.startTime，规则里面的endTime 要>= params.endTime
      const where = {
        cityCode: Array.isArray(params.code) ? params.code[0] : params.code,
        startTime: {
          [lte]: params.startTime
        },
        endTime: {
          [gte]: params.endTime
        },
        name: {
          [like]: '%' + params.houseName + '%'
        }
      };
      // 如果没有输入houseName则删掉where里的name
      if (!params.houseName) {
        delete where.name;
      }
      // 前端默认pageSize从1开始，而后端是从0开始的，所以要设置偏移量
      const result = await ctx.model.House.findAll({
        ...this.commonAttr(app),
        limit: 8,
        offset: (params.pageNum - 1) * params.pageSize,
        where
      });

      return result;
    });
  }

  // 民宿详情
  async detail(id) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findOne({
        where: {
          id
        },
        include: [
          {
            model: app.model.Imgs,
            attributes: [ 'url', 'id' ]
          }
        ]
      });

      // 每次访问某民宿详情，该民宿的showCount加一
      await ctx.model.House.update({
        showCount: result.showCount + 1
      }, {
        where: {
          id
        }
      });

      return result;
    });
  }
}

module.exports = HouseService;
