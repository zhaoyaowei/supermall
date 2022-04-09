export default {
  // 获取购物车中商品的数量
  cardLength(state) {
    return state.cardList.length
  },
  // 获取购物车中商品的信息
  cardList(state) {
    return state.cardList
  }
}