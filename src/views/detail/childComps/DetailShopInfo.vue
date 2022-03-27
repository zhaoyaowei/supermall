<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shopInfo.shopLogo" alt="">
      <span class="shop-name">{{shopInfo.name}}</span>
    </div>
    <div class="shop-middle">
      <span class="shop-middle-item shop-middle-left">
        <span class="sell-info">
          <div class="sell-count">{{shopInfo.cSells | sellCountFilter}}</div>
          <div class="sell-text">总销量</div>
        </span>
        <span class="goods-info">
          <div class="good-count">{{shopInfo.cGoods}}</div>
          <div class="good-text">全部宝贝</div>
        </span>
      </span>
      <span class="shop-middle-item shop-middle-right">
        <div class="score-info" v-for="item in shopInfo.score" :key="item.id">
          <span class="score-item score-name">{{item.name}}</span>
          <span class="score-item score-score" :class="{'score-score-high': item.isBetter}">{{item.score}}</span>
          <span class="score-item score-better" :class="{'score-better-good': item.isBetter}" >{{item.isBetter ? '高': '低'}}</span>
        </div>
      </span>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'DetailShopInfo',
    props: {
      shopInfo: {
        type: Object,
        default() {
          return {}
        }
      },
    },
    // Failed to resolve filter: sellCountFilter
    // 全局注册时时filter，没有s;组件过滤器是filters，否则过滤无效果
    // ｜ 管道符
    filters: {
      sellCountFilter(count) {
        if (count < 10000) return count
        return (count/10000).toFixed(1) + '万'
      }
    }
  }
</script>
<style scoped>
  .shop-info {
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }

  .shop-top {
    display: flex;
    /* 让元素垂直中心对齐 */
    align-items: center;
  }

  .shop-top img {
    height: 45px;
    width: 45px;
    
    border-radius: 50%;
  }

  .shop-name {
    margin-left: 10px;
  }

  .shop-middle {
    margin-top: 15px;
    display: flex;
    align-items: center;
  }

  .shop-middle-item {
    flex: 1;
  }

  .shop-middle-left {
    display: flex;
    justify-content: space-around;
    text-align: center;
    color: #333;
    border-right: 1px solid rgba(0, 0, 0, .1) ;
  }

  .sell-count, .good-count {
    font-size: 18px;
  }

  .sell-text, .good-text{
    font-size: 14px;
    margin-top: 10px;
  }

  .shop-middle-right {
    margin-left: 30px;
    font-size: 13px;
  }

  .score-info {
    display: flex;
  }

  .score-item {
    flex: 1;
    flex-direction: column;
    line-height: 24px;
  }

  .score-name {
    color: #333;
  }

  .score-score, .score-better {
    color: #5ea732;
    text-align: left;
  }

  .score-score {
    padding-left: 10px;
  }
  
  .score-score-high, .score-better-good {
    color: #f13e3a;
  }
  
  .shop-bottom {
    margin-top: 10px;
    text-align: center;
  }

  .enter-shop {
    /* inline-block行内块元素  inline行内元素 block块元素 
    行内块元素实际就是把块元素以行的形式展现，保留了块元素可以设置的对应CSS属性。
    css使用display:inline-block样式可以生成行内块元素。
    */
    display: inline-block;
    height: 30px;
    width: 150px;
    background-color: #f2f5f8;
    text-align: center;
    border-radius: 10px;
    line-height: 30px;
  }

</style>