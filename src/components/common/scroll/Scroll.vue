<template>
  <!-- 当 content 的高度不超过父容器的高度，是不能滚动的，
  而它一旦超过了父容器（wrapper）的高度，我们就可以滚动内容区了 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>


<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      data: {
		    type: Array,
        default: () => {
          return []
        }
      },
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,  //限制能否点击
        probeType: this.probeType,   //决定是否派发 scroll 事件
        pullUpLoad: this.pullUpLoad
      })

      console.log(this.scroll);


      // 2.监听滚动的位置 0=不监听  1=隔多久监听一次 2=滑动监听  3=滚动监听
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
      })
      }
      //如何解决可滚动区域的问题
      //根据scrollerHeight属性决定可滚动区域，即content中子组建的高度；刚开始计算高度时，没有将图片计算在内，后来图片加载后有了新的高度，但是属性却没有更新，所以滚动出了问题
      //如何解决？监听每一张图片是否加载完成，加载完成后执行refresh()  
      //原生js监听  img.onload = function() {}
      //vue中监听：@load='方法'
      //最后再调用scroll中的refresh刷新

      // 3.监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          console.log('监听到滚动到底部');
          this.$emit('pullingUp')
      })        
      }
    },
    methods: {
      //严谨写法：this.scroll && 先判断scroll是否有值(非null，即挂载完成)，有值再继续判断
      //滚动到指定的位置;
      scrollTo(x, y, time=300) {
        console.log('点击返回顶部或者某个位置');
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      //当上拉加载数据加载完毕后，需要调用此方法告诉 BS 数据已加载。
      finishPullUp() {
        console.log('数据已上拉加载成功');
        this.scroll && this.scroll.finishPullUp()
      },
      //重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
      refresh() {
        console.log('调用refresh刷新scrollerHeight');
        this.scroll && this.scroll.refresh()
      }
      //获取滚动的高度
      // getScrollY() {
      //   // 有值时，返回值；无值时，返回0
      //   return this.scroll ? this.scroll.y : 0
      // }
    },
    watch: {
		  data() {
        setTimeout(this.refresh, 20)
      }
    }
  }
</script>

<style scoped>

</style>
