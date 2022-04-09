<template>
  <transition name="bounce">
    <div class="toast" v-show="isShow">
      <div>{{message}}</div>
    </div>
  </transition>
</template>

<script>

  export default {
    name: 'Toast',
    props: {
      // 组件入参，此处不再是组件式封装
      // message: {
      //   type: String,
      //   default: ''
      // },
      // isShow: {
      //   type: Boolean,
      //   default:false 
      // }
    },
    data() {
      return {
        message: '',
        isShow: false
      } 
    },
    methods: {
      show(message, duration=2000) {
        // 以前的默认参数写法  duration = duration || 2000
        this.isShow = true
        this.message = message

        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration);
      }
    }
  }

</script>
<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 300px;
    height: 40px;
    line-height: 40px;
    text-align: center;


    z-index: 999;

    color: #fff;
    background-color: rgba(0, 0, 0, .65);
    border-radius: 5px;
    font-size: 18px;
  }

  /* vue动画过渡效果设置 */
  .bounce-enter-active {
    animation: bounce-in .2s;
  }
  .bounce-leave-active {
    animation: bounce-in .2s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0, 0);
    }
    /* 50% {
      transform: scale(1.5, 1.5);
    } */
    100% {
      transform: scale(1, 1);
    }
  }

</style>