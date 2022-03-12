<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <ul><li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li></ul>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"

  import {getHomeMultidata} from "network/home"



  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data () {
      return {
        // result: null   //不会被回收
        banners: [],
        recommends: []
      }
    },
    created() {
      //this = 这个组件的变量
      //1.请求多个数据  局部变量 函数域 函数栈  调用介绍 释放变量 垃圾回收机制（res被回收，result指向res的内存地址）
      getHomeMultidata().then((res) => {
        console.log(res);
        // this.result = res
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list; 
      }).catch((err) => {
        
      });
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
</style>
