<template>
  <div class="cart-item">
    <div class="item-left">
      <!-- <cart-check-btn @checkBtnClick="checkedChange" v-model="cardItem.checked"/> -->
      <cart-check-btn @click.native="checkClick" :is-checked="cardItem.checked"/>
    </div>
    <div class="item-img"><img :src="cardItem.image" alt=""></div>
    <div class="item-right">
      <div class="cart-title" >{{cardItem.title}}</div>
      <div class="cart-desc">{{cardItem.desc}}</div>
      <div class="cart-other">
        <div class="cart-price">¥ {{cardItem.price}}</div>
        <div class="cart-count">x {{cardItem.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CartCheckBtn from './CartCheckBtn'

  export default {
    name: 'CartListItem',
    components: { 
      CartCheckBtn 
    },
    props: {
      cardItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      checkClick() {
        // 把原来的值进行取反
        this.cardItem.checked = !this.cardItem.checked;
      }
    }
  }

</script>
<style scoped>
  .cart-item {
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-left {
    display: flex;
    align-items: center;
    margin-right: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    border-radius: 5px;
  }

  .item-right {
    padding: 2px 10px 2px 15px;
    overflow: hidden;
  }

  .cart-title {
    color: #333;
    font-size: 17px;
  }

  .cart-desc {
    color: #666;
    font-size: 14px;
    margin: 15px 0 0;

  }
  .cart-title, .cart-desc{
    overflow: hidden;
    /* 属性规定当文本溢出包含元素时发生的事情。 ellipsis-... | clip-修剪 */
    text-overflow: ellipsis;
    /* nowrap文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
    white-space: nowrap;
  }

  .cart-other {
    margin: 20px 0 0;
    display: flex;
    justify-content:space-between;
    font-size: 17px;

  }

  .cart-price {
    color: orangered;
  }
  .cart-count {
    color: #333;
  }
</style>