<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.id" :goodsItem="item"/>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue"

export default {
  name : "GoodsList",
  components: {
    GoodsListItem
  },
  //内传用props、外传用$emit
  props: {
    // 从home中获取goods
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .goods {
    /* item 需设置宽度百分比  且不包裹， flex-wrap属性规定弹性项目是否应换行。*/
    display: flex;
    flex-wrap: wrap;
    /* 均等分   属性（水平）对齐弹性容器的项目，当项目不占用主轴上所有可用空间时。
    space-around : 项目在行之前、行之间和行之后留有空间。
    flex-start: 默认值。项目位于容器的开头。
    flex-end: 项目位于容器的结尾。
    space-between	项目在行与行之间留有间隔。
    */
    justify-content: space-around;

    padding: 4px;
  }
</style>