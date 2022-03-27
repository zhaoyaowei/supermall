<template>
<!-- 容错处理 vue是异步请求，页面渲染时，还未拿到数据，会报错，所以需要v-if判断
当有值时再进行渲染 判断对象有值的方法 Object.keys().length !==0 -->
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="title-info">{{goods.title}}</div>
    <div class="price-info">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="other-info">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.columns[2]}}</span>
    </div>
    <div class="services-info">
      <span v-for="item in goods.services" :key="item.id">
        <img :src="item.icon" alt="">
        <span>{{item.name}}</span>
      </span>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'DetailBaseInfo',
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>
<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  
  .title-info {
    color: #222;
  }

  .price-info {
    margin-top: 10px;
  }

  .new-price {
    color: var(--color-high-text);
    font-size: 24px;
  }

  .old-price {
    margin-left: 5px;
    font-size: 14px;
    text-decoration: line-through;
  }

  .discount {
    border-radius: 8px;
    background-color: var(--color-high-text);
    color: #fff;
    font-size: 14px;
    margin-left: 5px;
    padding: 2px 5px ;
    
    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -6px;
  }

  .other-info {
    margin-top: 15px;
    font-size: 13px;
    
    /* https://www.runoob.com/w3cnote/flex-grammar.html */
    display: flex;
    /* space-between：两端对齐，项目之间的间隔都相等。 */
    justify-content: space-between;

    border-bottom: 1px solid rgba(100, 100, 100, .1) ;
    line-height: 30px;
  }

  .services-info {
    display: flex;
    justify-content: space-between; 
    /* padding-top: 30px;
    padding-bottom: 30px;  */
    line-height: 60px;
  }

  .services-info span img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .services-info span span {
    font-size: 13px;
    color: #333;
  }
</style>