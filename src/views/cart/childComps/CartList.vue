<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="item in cardList" :key="item.id" :card-item="item"/>
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem'

import Scroll from '@/components/common/scroll/Scroll'

import { mapGetters } from 'vuex'

  export default {
    name: 'CartList',
    components: {
      CartListItem,
        Scroll
    },
    computed: {
      ...mapGetters([
        'cardList'
      ])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }

</script>
<style scoped>
  .cart-list {
    display: flex;
    flex-direction: column;
    padding-top: 5px;
    border-bottom: 1px solid #ccc;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px - 44px);
    overflow: hidden;  
  }

</style>