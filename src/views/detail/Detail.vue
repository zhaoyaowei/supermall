<template>
  <div id="detail">
    <detail-navbar class="detail-navbar"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop-info="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavbar from './childComps/DetailNavbar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'


import Scroll from 'components/common/scroll/Scroll'


import { getDetail, Goods, ShopInfo, GoodsParam} from 'network/detail'

  export default {
    name: 'Detail',
    components: {
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Scroll
      },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shopInfo: {},
        detailInfo: {},
        paramInfo: {}
      }
    },
    created() {
      // 1. 保存传入的iid
      console.log(this.$route.params.iid);
      this.iid = this.$route.params.iid
      // 2.根据iid请求详情数据
      this.getDetail(this.iid)

    },

    methods: {
      /**
       * 网络请求相关方法
       */
      //获取商品详情
      getDetail() {
        getDetail(this.iid).then(res => {
          console.log(res);
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