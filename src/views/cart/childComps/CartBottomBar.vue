<template>
  <div class="bottom-bar">
    <div class="select-all" @click="selectAllClick">
      <cart-check-btn class="select-btn" :is-checked="isSelectAll"></cart-check-btn>
      <span class="select-text">全选</span>
    </div>
    <div class="total-price">合计: ¥{{totalPrice}}  </div>
    <div class="to-buy" @click="toBuyClick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CartCheckBtn from './CartCheckBtn.vue'

import {mapGetters} from 'vuex'

  export default {
  components: { 
    CartCheckBtn 
    },
  name: 'CartBottomBar',
  computed: {
    ...mapGetters(['cardList']),
    totalPrice() {
      return this.cardList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cardList.filter(item => item.checked).length
    },
    // 全选按钮点击：1、判断显示的状态，判断是否有1个未选中，则全部不选中（）    
    isSelectAll() {
      //如果数组为空，则默认不选中 
      if(!this.cardList.length) return false
      // 1、filter过滤出未勾选商品的数量，如果存在，则取反，返回false  -- 会遍历所有数据，性能不高
      // return !this.cardList.filter(item => !item.checked).length
      // 2、find查找如果存在1个未选中,则为true, 再取反，则返回false  --性能较高，查找到数据，即返回
      return !this.cardList.find(item => !item.checked)
      //3、 普通方法遍历数组，如果存在未勾选的，则返回false；全都遍历完后，没有未勾选的，则返回true
      // for(let item of this.cardList) {
      //   if(!item.checked) {
      //     return false
      //   }
      // }
      // return true


    }
  },
  methods: {
    // 全选按钮监听：监听点击全选和取消全选的点击事件，如果原来都是选中，点击之后全部取消选中；如果未选中或部分选中，点击之后全选
    selectAllClick() {
      console.log('点击全选或取消全选按钮,点击后按钮状态', !this.isSelectAll);
      if(this.isSelectAll) {   //全部选中，点击之后全部状态改成false
        this.cardList.forEach(item  => item.checked = false);
      } else {
        this.cardList.forEach(item  => item.checked = true);
      }
      // 不能使用这种写法，因为在遍历时互相影响了
      //this.cardList.forEach(item  => item.checked = !this.isSelectAll)   
    },
    toBuyClick(){
      if(this.checkLength == 0) {
        this.$toast.show('请选择您要购买的商品，亲～')
      }
    }
  }
  }

</script>
<style scoped>
  .bottom-bar {
    display: flex;
    flex: 1;
    text-align: center;
    line-height: 44px;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    right: 0;  
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    }

  .select-btn {
    /* 父元素是绝对定位 */
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 11px;
  }

  .select-all span {
    margin-left: 35px;
    color: #888;
    font-size: 14px;
  }

  .bottom-bar .total-price {
    margin-left: 15px;
    color: #666;
    font-size: 16px;
  }

  .bottom-bar .to-buy {
    position: fixed;
    right: 0;
    width: 100px;
    height: 44px;
    font-size: 14px;
    color: #fff;
    background-color: orangered;
  }
</style>