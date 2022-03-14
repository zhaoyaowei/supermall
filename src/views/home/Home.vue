<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <!-- v-on:tabcClick  监听自定义事件  $emit-->
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"/>
  </div>
</template>

<script>
//导入分类
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"

  import NavBar from "components/common/navbar/NavBar"
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goods/GoodsList"

  import { getHomeMultidata, getHomeGoods } from "network/home"


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList
    },
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
        currentType: 'pop'
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //this = 这个组件的变量
      //只写发送请求，封装, created中写主要逻辑，详细逻辑分离
      //1.请求多个数据  局部变量 函数域 函数栈  调用介绍 释放变量 垃圾回收机制（res被回收，result指向res的内存地址）
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop', 1)
      this.getHomeGoods('new', 1)
      this.getHomeGoods('sell', 1)


    },
    methods: {
      /**
       * 事件监听相关方法
       */
      tabClick(index) {
        // console.log(index);
        //case穿透
        switch(index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
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
        getHomeGoods(type, 1).then(res => {
          console.log(res);
          //添加数组数据
          //1. for常规方法
          // for（let n of Array）{
          //     newArray.push(n)
          // }
          //2. ...可变参数解构，再分别push
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
      })
      }
    }
  }
</script>

<style>
  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    /* 根据设置的top值决定是sticky还是static */
    position: sticky; 
    top: 44px;
    /* z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。Z-index 可用于将在一个元素放置于另一元素之后。 */
    z-index: 9;
  }
</style>
