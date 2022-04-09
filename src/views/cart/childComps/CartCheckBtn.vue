<template>
  <div>
    <div class="icon-selector" :class="{'checked-active': isChecked}">
      <img src="~assets/img/cart/tick.svg" alt="">
    </div>
  </div>
</template>

<script>

  export default {
    name: 'CartCheckBtn',
    props: {
		  isChecked: {
		    type: Boolean,
        default: false
      }
    }
  }

</script>
<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid #ccc;
    /* 光标类型 */
    cursor: pointer;
  }

  .checked-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>