<template>
  <scroll id="tab-menu" ref="scroll"> 
    <div class="menu-list-item"
      v-for="(item, index) in categories" :key="index"
      @click="menuItemClick(index)"
      :class="{active: index===currentIndex}"
      >{{item.title}}
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll';

  export default {
    components: { Scroll },
    name: 'CategoryTabMenu',
    props: {
      categories: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      menuItemClick(index) {
        console.log('监听点击商品分类菜单事件');
        this.currentIndex = index
        this.$emit('menuClick', index)
      }
    },
    updated() {
      console.log('数据更新后重新刷新DOM获取scrollerHeight高度');
      this.$refs.scroll.refresh()
    }

  }

</script>
<style scoped>
  #tab-menu {
    background-color: #f6f6f6;
    width: 100px;
    height: 100%;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list-item.active {
    background-color: #fff;
    color: var(--color-high-text);
    font-weight: 700;
    border-left: 3px solid var(--color-high-text);

  }
</style>