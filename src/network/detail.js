import { request } from "./request";

export function getDetail(iid) {
    return request({
      url: '/detail',
      params: {
        iid
      }
    }) 
}

// 商品基本信息封装
export class Goods {
  // 构造函数，复杂数据封装到类，面向对象开发
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

// 商铺信息封装
export class ShopInfo {
  constructor(shopInfo) {
    this.shopLogo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.cSells = shopInfo.cSells
    this.cGoods = shopInfo.cGoods
    this.score = shopInfo.score
  }
}

// 商品参数信息封装
export class GoodsParam {
  constructor(info, rule) {
    //注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.image ? info.image[0] : ''
    this.infos = info.set
    this.rules = rule.tables
  }
}

