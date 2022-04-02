import {debounce} from './utils'

export const itemImgListenrMiin = {
  // 公共变量data也可以混入
  data() {
    return {
      itemImgListener: null 
    }
  },
  mounted() {
  //1: 图片加载完成的事件监听
  //监听GoodsListItem中的图片加载完成, 再执行回调函数refresh()
  //将refresh函数传入到debounce函数中，生成1个新的函数
  const refresh = debounce(this.$refs.scroll.refresh, 500)

  //新写法，对监听的事件进行保存，变量中保存了函数，最后离开时取消掉
  this.itemImgListener = () => {
    // this.$refs.scroll.refresh()
    console.log('监听图片加载完成后，执行refresh函数');
    refresh()
  }

  this.$bus.$on('itemImageLoad', this.itemImgListener)
  console.log('我是监听主页和详情页动态图片的混入方法');
  }
}