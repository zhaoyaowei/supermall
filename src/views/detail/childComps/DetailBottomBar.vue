<template>
  <div class="bottom-bar">
    <div class="bottom-left">
      <div>
        <i class="icon service"></i>
        <span class="text-service">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text-service">店铺</span>
      </div>
      <div>
        <i class="icon"></i>
        <span class="text-service">收藏</span>
      </div>
    </div>
    <div class="bottom-right">
      <div class="bottom-item cart" @click="addToCart">加入购物车</div>
      <div class="bottom-item buy">购买</div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'DetailBottomBar',
    methods: {
      addToCart() {
        console.log('点击添加到购物车');
        this.$emit('addToCart')
      }
    }
  }

</script>
<style scoped>
  .bottom-bar {
    display: flex;
    position: fixed;
    background-color: #fff;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
  } 

  .bottom-left {
    display: flex;
    flex: 1;
    font-size: 13px;
  }

  .bottom-left> div {
    flex: 1;
  }

  .bottom-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 10px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bottom-left .service {
    background-position:0 -54px;
  }

  .bottom-left .shop {
    background-position:0 -98px;
  }

  .bottom-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
    display: flex;
    flex: 1;
  }

  .bottom-item {
    flex: 1;
  }

  .bottom-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bottom-right .buy {
    background-color: #f69;
  }
  
</style>