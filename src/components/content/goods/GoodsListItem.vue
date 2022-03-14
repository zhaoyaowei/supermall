<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" srcset="">
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
  }
}
</script>

<style>
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