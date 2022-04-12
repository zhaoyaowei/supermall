<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="desc-info">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="key-info">{{detailInfo.detailImage[0].key}}</div>
    <div class="list-info" v-for="item in detailInfo.detailImage[0].list" :key="item">
      <img :src="item" alt="" @load="imgLoad">  
    </div>
  </div>
</template>

<script>

  export default {
    name: 'DetailGoodsInfo',
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        count: 0,
        imageListLength: 0
      }
    },
    methods: {
      // 监听图片加载事件
      imgLoad() {
        console.log('监听详情页图片加载事件');
        // 此处判断，所有图片都加载完成了，再进行一次回调即可，需要动态获取图片的个数
        // count先自加1，然后参与判断
        if (++this.count === this.imageListLength) {
          console.log('发送图片加载完成事件成功');
          this.$emit('imageLoad')
        }
      }
    },
    watch: {
      detailInfo() {
        this.imageListLength = this.detailInfo.detailImage[0].list.length
      }
    }
  }

</script>
<style scoped>
  .goods-info {
    padding-top: 20px;
  }

  .desc-info {
    padding: 0 15px;
  }

  .desc-info .start, .desc-info .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .desc-info .start {
    float: left;
  }

  .desc-info .end {
    float: right;
  }

  .desc-info .start::before, .desc-info .end::after {
    content: '';
    height: 5px;
    width: 5px;
    background-color: #333333;
    position: absolute;
    bottom: 0;
  }

  .desc-info .end::after {
    right: 0;
  }

  .desc-info .desc {
    padding: 15px 0;
    color: #666;
    font-size: 14px;
  }

  .key-info {
    margin: 10px 0 10px 15px;
    font-size: 15px;
    color: #333333;
  }

  .list-info img {
    width: 100%;
  }

</style>