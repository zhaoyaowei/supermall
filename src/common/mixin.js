import {debounce} from './utils'
import {BACKTOP_DISTANCE, POP, NEW, SELL}  from 'common/const'
import BackTop from 'components/content/backTop/BackTop'
import TabControl from "components/content/tabControl/TabControl"


export const itemImgListenrMixin = {
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
      // console.log('监听图片加载完成后，执行refresh函数');
      refresh()
    }

    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('我是监听主页、详情页、分类页动态图片的混入方法');
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },

  data() {
    return {
      isShowBackTop: false,
    }
  },
  
  methods: {
    //1. 监听返回顶部按钮，并设置500毫秒返回
    backClick() {
      // console.log('点击回到顶部');
      this.$refs.scroll.scrollTo(0, 0, 500)
    },

    //2. 监听并决定控件隐藏和展示，负值取反 大于1000，更改属性值为true
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > BACKTOP_DISTANCE
    }
  }
}


export const tabControlMixin = {
  components: {
    TabControl
  },
  data: function () {
    return {
      currentType: POP,
      isTabFixed: false,
      tabOffsetTop: 0,
    }
  },
  methods: {
    tabClick(index) {
      //case穿透
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);

      //bug解决，两个tabControl当前的index不同步
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    }
  }
}