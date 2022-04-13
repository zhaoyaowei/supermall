<template>
  <div id="user-info">
    <div><img class="avatar-img" src="~assets/img/profile/avatar.svg" alt=""></div>
    <div class="login-info">
      <div class="login">登录/注册</div>
      <div class="phone">
        <img class="phone-img" src="~assets/img/profile/phone.svg" alt="" srcset="">
        <div class="phone-text">暂无绑定手机号</div>
      </div>
      <div class="icon-right"></div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
    display: flex;
  }

  #user-info .avatar-img {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  .login {
    padding-left: 5px;
  }

  .phone {
    position: relative;
  }

  .phone-img {
    width: 23px;
    height: 29px;
  }

  .phone-text {
    font-size: 13px;
    display: inline-block;
    position: absolute;
    left: 24px;
    top: 5px;
    white-space: nowrap;
  }
</style>
