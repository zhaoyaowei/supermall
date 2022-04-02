<template>
  <div id="detail">
    <detail-navbar class="detail-navbar"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop-info="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info></detail-recommend-info>
      <goods-list :goods="recommendInfo"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavbar from './childComps/DetailNavbar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailRecommendInfo from './childComps/DetailRecommendInfo'


import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList.vue'

import { getDetail, getRecommend, Goods, ShopInfo, GoodsParam } from 'network/detail'
import {itemImgListenrMiin} from 'common/mixin'

  export default {
    name: 'Detail',
    components: {
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      GoodsList,
      Scroll
      },
    mixins: [itemImgListenrMiin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shopInfo: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendInfo: []      
      }
    },
    created() {
      // 1. 保存传入的iid
      console.log(this.$route.params.iid);
      this.iid = this.$route.params.iid
      // 2.根据iid请求详情数据
      this.getDetail(this.iid)

      // 3. 获取详情页推荐数据
      this.getRecommend()
    },
    mounted() {
      // 和主页mounted代码有重复，采用混入，见mixin.js
    },

    deactivated() {
      console.log('离开详情页时我们没有做缓存，所以不会调这个函数，故用destroyed');
    },

    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },

    methods: {
      /**
       * 网络请求相关方法
       */
      //获取商品详情
      getDetail() {
        getDetail(this.iid).then(res => {
          console.log('商品详情数据:', res);
          const data = res.result
          // 1.获取顶部的图片轮播数据
          this.topImages = data.itemInfo.topImages

          // 2. 获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

          //3. 获取商铺信息
          this.shopInfo = new ShopInfo(data.shopInfo)

          //4. 获取商品详细信息
          this.detailInfo = data.detailInfo

          //5. 获取商品参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          //6. 获取商品评价信息
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0]
          }
        })
      },
      
      getRecommend() {
        getRecommend().then(res => {
          console.log('详情页推荐数据:', res);
          this.recommendInfo = res.data.list
        })
      },

      /**
       * 事件监听相关方法
       */
      imageLoad() {
        console.log('监听图片加载完成，重新计算可滚动高度');
        this.$refs.scroll.refresh()
      }
    }
  }
</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-navbar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  /* 父元素没有设置高度，根据内容撑高，我们希望父元素固定高度，设置视口 */
  .content {
    height: calc(100% - 44px);
    /* overflow: hidden; */
  }

</style>