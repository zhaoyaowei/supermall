<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="item.id" 
         class="tab-control-item" :class="{active: index === currentIndex}" 
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
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
    itemClick(index) {
      this.currentIndex = index;
      //点击时间外传  自定义事件
      this.$emit('tabClick', index)
    }
  }

}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    /* 透明 */
    background-color: #fff; 
    /* z-index: 5; */
  }

  .tab-control-item {
    flex: 1;

  }

  .active {
    color: var(--color-high-tint);
  }
  .active span {
    padding: 5px;
    border-bottom: 3px solid var(--color-tint);

  }
</style>