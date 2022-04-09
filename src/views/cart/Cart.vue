<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav"><div slot="center">购物车 ({{cardLength}})</div></nav-bar>
    <!-- 购物车列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar 
  },
  computed: {
    // cartLength() {
    // getters使用，直接转化成计算属性
    // 1. 不使用getters: return this.$store.state.CartList.length
    // 2. 使用getters，但代码还是很麻烦，return this.$store.getters.cardLength
    // }
    // 3. 使用vuex中的mapGetters映射到局部属性，解构，使用对象展开运算符将 getter 混入 computed 对象中，2种写法
    ...mapGetters([
        'cardLength'    
    ])  //与getters中的方法名一一对应
    // ...mapGetters({   //自定义参数
    //   length: 'cardLength',
    //   list: 'cardList'
    // })

  }
}
</script>

<style>
  .cart-nav {
    color: #fff;
    background-color: var(--color-tint);
    font-weight:700;
  }
</style>