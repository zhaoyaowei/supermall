// import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from './components/common/toast'

Vue.config.productionTip = false
//vue3写法：createApp(App).use(store).use(router).mount('#app')
// 使用createApp返回一个提供应用上下文的应用实例。应用实例挂载的整个组件树共享同一个上下文。
// createApp(App).use(router).mount('#App')

// $bus默认为空，故在原型js中设置1个vue实例作为事件总线
Vue.prototype.$bus = new Vue()
// 安装toast插件，去调用toast的install函数，默认传值Vue
Vue.use(toast)

// 解决移动端300延迟,附加
FastClick.attach(document.body)

// 使用懒加载插件  https://github.com/hilongjw/vue-lazyload
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

//vue2写法：
new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')

// 创建的vue实例没有el属性，而是在实例后面添加了一个$mount(’#app’)方法。
// $mount(’#app’) ：手动挂载到id为app的dom中的意思
// 当Vue实例没有el属性时，则该实例尚没有挂载到某个dom中；
// 假如需要延迟挂载，可以在之后手动调用vm.$mount()方法来挂载

// render函数是vue通过js渲染dom结构的函数createElement，约定可以简写为h
// 官方文档中是这样的，createElement 是 Vue.js 里面的 函数，
// 这个函数的作用就是生成一个 VNode节点，
// render 函数得到这个 VNode 节点之后，
// 返回给 Vue.js 的 mount 函数，渲染成真实 DOM 节点，并挂载到根节点上。
    
    



