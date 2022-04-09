<template>
  <div class="goods-item" @click="itemClick">
    <!-- @load 表示在vue中监听图片完成事件  Image对象的load事件回调，当图片加载完成后执行onload绑定的函数-->
    <!-- GoodsListItem子组件->GoodsList父组件-> home 爷组件  涉及到非父子组件通信 通过vuex或者事件总线-->
    <!-- bus总线、Vue.prototype.$bus = new Vue() 发送this.$bus.$emit('事件名称'，参数) 接收this.$bus.$on('事件名称'，回调函数)  -->
    <img v-lazy="showImage" alt="" srcset="" @load="imageLoad">
    <div class="goods-info"> 
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    // 主页商品数据和详情页推荐数据中的图片获取方式不同
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {
      console.log('监听图片事件');
      // 发送图片加载完成事件
      this.$bus.$emit('itemImageLoad')
      // 方法2：进入详情，首页不需要再监听这个事件，反之亦然，采用方法2，离开的时候，取消全局事件的监听$off,
      // 但是不能只传事件，需要告诉它取消哪个函数，所以抽取函数


      //方法1：通过路由区别主页和详情页图片加载完成的事件发送 
      // if (this.$route.path.indexOf('/home')) {
      //   this.$bus.$emit('homeItemImageLoad')
      // } else  if (this.$route.path.indexOf('/detail')) {
      //   this.$bus.$emit('detailItemImageLoad')
      // }
    },
    itemClick() {
      console.log('监听点击跳转至详情页');
      // 此处不用replace，因为需要返回上一级
      this.$router.push('/detail/' + this.goodsItem.iid) 
      // query方式
      // this.$router.push({
      //   path: '/detail',
      //   query: {
          
      //   }
      // })
    }
  }
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    /* 相对布局   子绝父相*/
    position: relative; 
    
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    /* 图片圆角 */
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    /* 绝对布局 */
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    /*  属性规定当内容溢出元素框时发生的事情。 hidden内容被修剪，其余内容不可见、scroll 滚动*/
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    /* 属性规定当文本溢出包含元素时发生的事情。 ellipsis-... | clip-修剪 */
    text-overflow: ellipsis;
    /* nowrap文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .collect::before {
    /* content 属性来指定要插入的内容。 */
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;

    width: 14px;
    height: 14px;
    /* background简写属性在一个声明中设置所有的背景属性。 
    第一个数字0表示背景颜色
    第二个0/14px的含义：
    0 是background-position的属性简写。background-position 属性设置背景图像的起始位置。
    14px 是background-size的属性简写。background-size 属性规定背景图像的尺寸。
    最后14px和前面14px共同构成background-size：（这个14px可省略）

    */
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;

  }


  


</style>