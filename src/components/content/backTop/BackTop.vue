<template>
  <div class="back-top"> 
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'BackTop'
  }

</script>
<style scoped>
  /* @import url(); 引入公共css类 */
  .back-top {
    position: fixed;
    right: 8px;
    bottom: 55px;
  }

  .back-top img {
    height: 43px;
    width: 43px;
  }
</style>