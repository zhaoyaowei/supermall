<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <category-tab-menu :categories="categories" @menuClick="menuClick"></category-tab-menu>
      <tab-control class="tab-control"
                       :titles="['综合', '新品', '销量']" 
                       @tabClick="tabClick"
                       ref="tabControl1" 
                       v-show="isTabFixed" 
                       :style="{'width': '74%'}">
      </tab-control>
      <scroll id="sub-content" 
              :data="[categoryData]" 
              ref="scroll"
              :probe-type="3"  
              @scroll="contentScroll" >
        <div class="sub">
          <category-sub-info :subcategories="getSubcategoryInfo"></category-sub-info>
          <tab-control :titles="['综合', '新品', '销量']" 
                       @tabClick="tabClick"
                       ref="tabControl2">
          </tab-control>
          <goods-list :goods="getCategoryTabInfo"></goods-list> 
        </div>       
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>

  </div>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import CategoryTabMenu from './childComps/CategoryTabMenu'
import CategorySubInfo from './childComps/CategorySubInfo'

import { getCategory, getSubcategory, getCategoryTabDetail} from 'network/category'
import {POP, NEW, SELL} from 'common/const'
import {tabControlMixin, itemImgListenrMixin, backTopMixin} from 'common/mixin'
import { debounce } from 'common/utils'


  export default {
    name: "Category",
    components: { 
      NavBar,
      CategoryTabMenu,
      CategorySubInfo,
      GoodsList,
      Scroll 
    },
    mixins: [tabControlMixin, itemImgListenrMixin, backTopMixin],
    data() {
      return {
        categories: [],
        categoryData: {},
        currentIndex: -1,
      }
    },
    computed: {
      getSubcategoryInfo() {
        if(this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      getCategoryTabInfo() {
        if(this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryTabDetail[this.currentType]
      }
    },
    created() {
      // 1.获取商品分类信息
      this.getCategory()

            // 4. 给tabOffsetTop赋值
      this.getTabOffsetTop = debounce(() => {
        this.tabOffsetTop = 0
        // 1: 不能在create中获取元素，所以考虑在mounted中获取
        // 2: 获取详情navbar的offsetTop,$el可能因为没有拿到数据，$el=undefined为空，所以也不能写到此处
        // 3: 在确认getDetail获取到数据之后，不一定马上就有值，需要等渲染完毕之后更新DOM，所以考虑在updated中
        // 4: $nextTick() - 3更新太频繁，所以可以使用此函数等数据渲染完毕后回调函数 也可以获取到值；
        // 此时根据最新的数据，对应的DOM是已经被渲染出来，但是图片仍然是没有加载完（此时获取到的offsetTop不包含其中的图片）
        // 5: 调用太频繁，采用防抖函数
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        console.log(this.tabOffsetTop);
      })
    },
        // 注意：只有当组件在 <keep-alive> 内被切换，才会有activated 和 deactivated 这两个钩子函数
    activated() {
      //bug：3个TAB同步滚动
      console.log('activated一进入页面被触发');
      // this.$refs.scroll.scrollTo(0,this.savaY, 0)
      // 重新返回时，最好刷新一次
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // this.savaY = this.$refs.scroll.getScrollY()
      console.log('deactivated一离开页面被触发,离开时的位置');

      // 1: 离开时取消全局事件的监听，不能传事件，否则都会被取消掉，所以取消函数（在mounted中）
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      /**
       * 网络请求相关方法
       */

      //获取商品分类信息
      getCategory() {
        getCategory().then(res => {
          console.log('获取商品分类菜单数据：',res);
          // 1. 获取分类数据
          this.categories =  res.data.category.list
          // 2. 初始化每个类别的数据
          for(let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryTabDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategory(0)
          this.getTabOffsetTop()

        })

      },

      _getSubcategory(index) {
        this.currentIndex = index
        const maitKey = this.categories[index].maitKey
        getSubcategory(maitKey).then(res => {
          console.log('获取商品子分类数据',res);
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryTabDetail(POP)
          this._getCategoryTabDetail(SELL)
          this._getCategoryTabDetail(NEW)
        })
      },

      _getCategoryTabDetail(type) {
        // 1. 获取请求的miniWallKey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey
        // 2. 发送请求，传入miniWallKey、type
        getCategoryTabDetail(miniWallkey, type).then(res => {
          this.categoryData[this.currentIndex].categoryTabDetail[type] = res
          // 3. 将获取的数据保存下来
          this.category = {...this.categoryData}
        })
      },


      /**
       * 事件监听相关方法
       */
      menuClick(index) {
        this._getSubcategory(index)
        this.getTabOffsetTop()

      },
      //监听滚动位置
      contentScroll(position) {
        //1.决定tabControl是否吸顶(position: fixed 或者复制)
        this.isTabFixed = (-position.y) > this.tabOffsetTop

        //2.监听并决定控件隐藏和展示，负值取反 大于1000，更改属性值为true
        this.listenShowBackTop(position)
      },
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    overflow: hidden;
    display: flex;
  }

  #menu-content {
    height: 100%;
  }

  #sub-content {
    height: 100%;
    flex: 1;
    position: absolute;
    top: 0;
    left: 100px;
    right: 0;
  }

  .tab-control {
    /* 根据设置的top值决定是sticky还是static */
    /* position: sticky;   适用于原生js BS不适用*/
    /* 相对定位，依然可以在原来的位置 */
    position: relative;
    width: 100%;
    height: 40px;
    /* z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。Z-index 可用于将在一个元素放置于另一元素之后。 */
    z-index: 9;
    /* background-color: red; */
  }

</style>