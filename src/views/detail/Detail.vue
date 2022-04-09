<template>
  <div id="detail">
    <detail-navbar class="detail-navbar" @titleClick="titleClick" ref="navbar"/>
    <scroll class="content" 
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3">
      <!-- 属性(不区分大小写，所以用-，若用topImages传，找不到属性)：topImages 
      传入值：top-images -->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop-info="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <detail-recommend-info ref="recommend"/>
      <goods-list :goods="recommendInfo"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
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
import DetailBottomBar from './childComps/DetailBottomBar.vue'
import BackTop from '@/components/content/backTop/BackTop.vue'


import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList.vue'

import { getDetail, getRecommend, Goods, ShopInfo, GoodsParam } from 'network/detail'
import {itemImgListenrMixin, backTopMixin} from 'common/mixin'
import { debounce } from '@/common/utils'
import {mapActions} from 'vuex'

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
      DetailBottomBar,
      Scroll,
      BackTop       
      },
    mixins: [itemImgListenrMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shopInfo: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendInfo: [],
        navbarTopY: [],
        getNavbarTopY: null,
        currentIndex: 0,
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

      // 4. 给NavbarTopY赋值
      this.getNavbarTopY = debounce(() => {
        this.navbarTopY = []
        // 1: 不能在create中获取元素，所以考虑在mounted中获取
        // 2: 获取详情navbar的offsetTop,$el可能因为没有拿到数据，$el=undefined为空，所以也不能写到此处
        // 3: 在确认getDetail获取到数据之后，不一定马上就有值，需要等渲染完毕之后更新DOM，所以考虑在updated中
        // 4: $nextTick() - 3更新太频繁，所以可以使用此函数等数据渲染完毕后回调函数 也可以获取到值；
        // 此时根据最新的数据，对应的DOM是已经被渲染出来，但是图片仍然是没有加载完（此时获取到的offsetTop不包含其中的图片）
        // 5: 调用太频繁，采用防抖函数
        this.navbarTopY.push(0);
        this.navbarTopY.push(this.$refs.param.$el.offsetTop - 44)
        this.navbarTopY.push(this.$refs.comment.$el.offsetTop - 44)
        this.navbarTopY.push(this.$refs.recommend.$el.offsetTop - 44)
        // 增加1个最大值  Number.MAX_VALUE（空间换时间，增加性能）
        this.navbarTopY.push(Number.MAX_VALUE)

        console.log(this.navbarTopY);
      })
    },
    mounted() {
      // 和主页mounted代码有重复，采用混入，见mixin.js
      
    },
    updated() {
    },

    deactivated() {
      console.log('离开详情页时我们没有做缓存，所以不会调这个函数，故用destroyed');
    },

    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },

    methods: {
      ...mapActions(['addCart']),
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

          this.$nextTick(() => {
            // 点击标题跳转至对应位置，在图片加载完成之后获取offsetTop，
          })
        })
      },
      
      //获取详情页推荐数据 
      getRecommend() {
        getRecommend().then(res => {
          console.log('详情页推荐数据:', res);
          this.recommendInfo = res.data.list
        })
      },

      /**
       * 事件监听相关方法
       */
      // 监听图片加载完成，并获取子组件的高度
      imageLoad() {
        console.log('监听图片加载完成，重新计算可滚动高度');
        this.$refs.scroll.refresh()
        
        // 图片加载完成之后，获取对应位置
        this.getNavbarTopY()
      },

      // 监听navbar的点击事件，滚动至对应位置
      titleClick(index) {
        console.log('详情页接收navbar点击事件：', index, -this.navbarTopY[index]);
        this.$refs.scroll.scrollTo(0, -this.navbarTopY[index], 500)
      },

      // 监听详情滚动事件，滚动内容对应
      contentScroll(position) {
        // console.log(position);
        // 1. 获取y值
        let positionY = - position.y

        // 2. positionY和主题中的值进行对比 navbarTopY[0, 7938, 9120, 9452, ~]
        // 分析： 0 < positionY < 7938 ,index = 0
        //       7938 =< positionY < 9120 ,index = 1
        //       9120 =< positionY < 9452 ,index = 2

        // 特别： 9452 < positionY ,index = 3
        //  遍历navbarTopY
        const len = this.navbarTopY.length
        for(let i = 0; i < len - 1; i++) {
          // console.log('i和i的类型：', i , typeof i);  
          //1: 第1个问题 str 3 + 1 = 31  i针对对象遍历的key, 所以是字符串,for(let i in this.navbarTopY)
          //2: 第2个问题 i + 1 下标越界， undefined
          // if(positionY > this.navbarTopY[i] && positionY < navbarTopY[i+1]) {
          //   // 这种写法下标越界，不对
          // }
          // 先判断currentIndex是否等于i，如果不等于，继续判断，减少判断的次数；如果等于，则直接返回当前index


          // 一、普通做法  i < len
          // if(this.currentIndex !== i && ((i < len -1 && positionY >= this.navbarTopY[i] && positionY < this.navbarTopY[i+1]) || 
          // (i === len - 1  && positionY >= this.navbarTopY[i]))) { 
          //   this.currentIndex = i
          //   console.log(this.currentIndex);
          //   this.$refs.navbar.currentIndex = this.currentIndex
          // }

          // 二、hacker做法
          if(this.currentIndex !== i  && ((positionY >= this.navbarTopY[i] && positionY < this.navbarTopY[i+1]))) {
            this.currentIndex = i
            console.log('当前内容滚动的区域位置', this.currentIndex);
            this.$refs.navbar.currentIndex = this.currentIndex
          }
        }

        //一般方法中的逻辑不建议混入，如果混入，则需要新增1个方法
        // this.isShowBackTop = positionY > BACKTOP_DISTANCE
        this.listenShowBackTop(position)

      },
      // 监听加入购物车事件
      addToCart() {
        // 1. 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 2. 将商品添加到购物车中(1、actions可以返回1个promise   2、mapAction的映射关系)
        // this.$store.cartList.push(product)  不建议这样做，通过mutation，commit调用mutation中的addCart方法
        // this.$store.commit('addCart', product)  但不建议在mutian中执行复杂操作，通过actions修改
        // 接收到promise, this.$store.dispatch = this.addCart,
        // promise = this.$store.dispatch('addCart', product)，then
        // this.$store.dispatch('addCart', product).then(res => console.log(res) )
        this.addCart(product).then(res => this.$toast.show(res))
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
    height: calc(100% - 44px - 49px);
    /* overflow: hidden; */
  }

</style>