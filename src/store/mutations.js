import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  [ADD_COUNTER](state, payload) {
    console.log('再次添加该商品至购物车',payload);
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    console.log('新添加1个商品至购物车', payload);
    payload.count = 1;
    payload.checked = true;
    state.cardList.push(payload)
  }
}