import Toast from './Toast'

// 整体来看，这里创建了一个对象obj，然后添加了一个install方法，再将对象obj默认抛出。
// 这里的install方法其实就是给Vue.use方法识别的，识别到了这个install方法后就会进行我们自己设置的操作

const obj = {}

obj.install = function(Vue) {
  // 1、创建组件构造器  
  // Vue.extend()是Vue组件的构造器，除了可以像官方例子直接传入组件对象，我们也可以直接传入组件
  const toastContrustor = Vue.extend(Toast)
  // 2、根据组件构造器，可以创建出1个组件对象，创建toast实例
  const toast = new toastContrustor()
  // 3、将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4、toast.$el对应的就是div，将toast实例添加至body
  document.body.appendChild(toast.$el)
  // 5、添加至原型
  Vue.prototype.$toast = toast
}

export default obj