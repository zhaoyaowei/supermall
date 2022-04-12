<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" 
              @tabClick="tabClick"
              ref="tabControl1"
              class="tab-control"
              v-show="isTabFixed">
    </tab-control>
    <!-- @scroll 监听自定义事件 -->
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3"  
            @scroll="contentScroll" 
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <!-- v-on:tabClick  监听自定义事件  $emit-->
      <tab-control :titles="['流行', '新款', '精选']" 
                   @tabClick="tabClick"
                   ref="tabControl2">
      </tab-control>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!-- .native修饰符可直接监听组件的原生事件，该组件与scroll同子级，无需传递给父组件home，再由home传递给scroll -->
    <!-- 此处v-show的值true和false不会被当成变量 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
//导入分类
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"

  import NavBar from "components/common/navbar/NavBar"
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import { getHomeMultidata, getHomeGoods } from "network/home"
  import {itemImgListenrMixin, backTopMixin, tabControlMixin} from 'common/mixin'
  import {POP, NEW, SELL} from 'common/const'


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins: [itemImgListenrMixin, backTopMixin, tabControlMixin],
    data () {
      return {
        // result: null   //不会被回收
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: []},
          'new': { page: 0, list: []},
          'sell': { page: 0, list: []}
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false
        // savaY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      // 离开页面时，销毁事件或函数
      console.log('Home主页destroyed销毁')
    },
    // 注意：只有当组件在 <keep-alive> 内被切换，才会有activated 和 deactivated 这两个钩子函数
    activated() {
      //bug：3个TAB同步滚动
      console.log('activated一进入页面被触发');
      // this.$refs.scroll.scrollTo(0,this.savaY, 0)
      // 重新返回时，最好刷新一次
      // this.$refs.scroll.refresh()
    },
    deactivated() {
      // this.savaY = this.$refs.scroll.getScrollY()
      console.log('deactivated一离开页面被触发,离开时的位置');

      // 1: 离开时取消全局事件的监听，不能传事件，否则都会被取消掉，所以取消函数（在mounted中）
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    created() {
      //this = 这个组件的变量
      //只写发送请求，封装, created中写主要逻辑，详细逻辑分离
      //1.请求多个数据  局部变量 函数域 函数栈  调用介绍 释放变量 垃圾回收机制（res被回收，result指向res的内存地址）
      //不要在creat中获取元素$ref或者document.queryselector()
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods(POP)
      this.getHomeGoods(NEW)
      this.getHomeGoods(SELL)


    },
    mounted() {
      //1: 图片加载完成的事件监听
      //监听GoodsListItem中的图片加载完成, 再执行回调函数refresh()
      //将refresh函数传入到debounce函数中，生成1个新的函数
      // const refresh = debounce(this.$refs.scroll.refresh, 500)

      //新写法，对监听的事件进行保存，变量中保存了函数，最后离开时取消掉,见mixin.js混入

      // 旧写法
      // this.$bus.$on('itemImageLoad', () => {
      //   // this.$refs.scroll.refresh()
      //   console.log('监听图片加载完成后，执行refresh函数');
      //   refresh()
      // }),

      // //2: 获取tabControl的offsetTop
      // //所有组件都有1个属性$el: 用于获取组件中的元素；this.$refs.tabControl获取子组件对象
      // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop

      // function() {
      //   setTimeout(() => {
      //     this.handleDom();
      //     this.startTimer();
      //   }, 5000)
      // }
    },
    methods: {
      /**
       * 事件监听相关方法
       */
      
      //1、监听tabClick点击事件，并返回点击类型,混入tabControlMixin

      //2、监听返回顶部按钮，并设置500毫秒返回,混入backTopMixin
      
      //3、监听滚动位置
      contentScroll(position) {
        // console.log(position);
        //1.监听并决定控件隐藏和展示，负值取反 大于1000，更改属性值为true
        this.listenShowBackTop(position)

        //2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
        // console.log(this.isTabFixed);
      },

      //上拉加载更多
      loadMore() {
        // console.log("上拉加载更多成功");
        this.getHomeGoods(this.currentType)
        //监听图片异步加载完成之后，刷新并重新计算可滚动高度
        this.$refs.scroll.scroll.refresh()
      },

      //监听轮播图（大图）加载完成之后，再获取tabControl的offsetTop
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.tabOffsetTop);
      },
      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then((res) => {
          console.log(res);
          // this.result = res
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list; 
      }).catch((err) => {
      
      })
      },
      getHomeGoods(type) {
        let page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          console.log(res);
          //添加数组数据
          //1. for常规方法
          // for（let n of Array）{
          //     newArray.push(n)
          // }
          //2. ...可变参数解构，再分别push
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // 当数据加载完成之后调用此方法，告诉bs数据已加载，因为scroll默认只加载一次
          this.$refs.scroll.finishPullUp()
      })
      }
    }
  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    /* 100适口 */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    
    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    /* 根据设置的top值决定是sticky还是static */
    /* position: sticky;   适用于原生js BS不适用*/
    /* 相对定位，依然可以在原来的位置 */
    position: relative;
    /* top: 44px; */
    /* z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。Z-index 可用于将在一个元素放置于另一元素之后。 */
    z-index: 9;
  }

  .content {
    /* height: 500px; */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */

  /* 该方案需要隐藏#home中的padding-top
  .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
