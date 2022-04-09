import Vue from 'vue';
import Vuex from 'vuex'
import mutations from  './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

const state = {
  cardList: []
}

// 2.创建store对象
const store = new Vuex.Store({
  state,

  // 修改statu中的状态，设计原则：其中的每一个方法尽可能单一，否则无法跟踪到具体执行了哪个方法；所以优先通过action修改
  // mutations中的参数是state; payload载荷，对象
  mutations,

  // actions中的参数是上下文context,通过context取到state;  context入参可解构 {state, commit}
  actions,

  // 
  getters
});

// 3.挂载到vue实例中
export default store