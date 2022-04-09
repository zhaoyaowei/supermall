import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // payload新添加的商品
      // 1. for循环遍历已有数据，判断添加的商品是否已经添加过，是，则指向已有商品
      // let oldProduct = null;   //临时变量
      // for(let item of state.cardList) {
      //   if(item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }
      // find函数，若true,则有值，返回item;函数入参;
      // let product = state.cardList.find(function(item) {
      //   return item.iid === payload.iid
      // })
      // 简写，查找之前数据组中是否有该商品
      let oldProduct = context.state.cardList.find(item => item.iid === payload.iid)

      // 2: 遍历完后判断oldProduct 是否存在，是，则已有商品数量+1；否，则新添加的商品数量设置为1，并添加进state
      if(oldProduct) {
        // oldProduct.count += 1;  数量+1，为方便跟踪，不在此处操作
        context.commit(ADD_COUNTER, oldProduct)
        resolve('重复添加商品至购物车成功！')
      } else {
        // payload.count = 1;   
        // context.state.cardList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加新的商品至购物车成功！')
      }
    })
}
}