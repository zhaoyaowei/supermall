<template>
  <div id="app" >
     <!--新版better scroll可以保留原来位置；若无法保留，离开时保留saveY ，进来时设置saveY -->
    <keep-alive exclude="Detail">
      <router-view></router-view> 
    </keep-alive>
    <MainTabBar/>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar"
  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style scoped>
  @import "assets/css/base.css";
</style>