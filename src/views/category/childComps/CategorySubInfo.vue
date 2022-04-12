<template>
  <div class="sub-info">
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
      <div class="sub-item" v-for="item in subcategories.list" :key="item.id" >
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="" @load="subImgLoad">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from 'components/common/gridView/GridView'

  export default {
    components: { GridView },
    name: 'CategorySubInfo',
    props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }    
      }
    },
    methods: {
      subImgLoad() {
        console.log('监听分类列表图片事件');
        this.$bus.$emit('itemImageLoad')
      }
    }
  }
</script>
<style scoped>
  .sub-item {
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
    text-align: center;
  }
</style>