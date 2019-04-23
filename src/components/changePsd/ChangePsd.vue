<template>
  <div class="container">
    <!-- 顶部 -->
    <!-- <div class="header">
      <div class="iconfont icon-tubiaozhizuo- left" @click="navigate"></div>
      <div class="center">修改密码</div>
    </div> -->
    <div class="content">
      <!-- 修改密码logo -->
      <div class="mdl_login">
        <img src="../../assets/images/change.png" alt="" />
      </div>
      <!-- 修改密码表单 -->
      <div class="mdl_form">
        <input
          type="tel"
          placeholder="请输入手机号码"
          @blur="telphone"
          v-model="tel"
          maxlength="11"
          :class="flag ? 'rule_tel' : ''"
        />
        <div class="msg">{{ this.msg_tel }}</div>
        <input
          type="number"
          placeholder="请输入验证码"
          maxlength="4"
          @blur="yanzhengma"
          @input="maxlength"
          v-model="yzm"
          :disabled="disabled1"
        />
        <div class="msg1">{{ this.msg_yzm }}</div>
        <button
          type="button"
          class="getYzm"
          :disabled="gray"
          @click="getYzm"
          :style="gray ? 'color:#999;border:1px solid #999;' : ''"
        >
          {{ gray ? this.seconds + "S" : this.msg }}
        </button>
        <input
          type="password"
          placeholder="请输入密码"
          :class="flag2 ? 'rule_pwd' : ''"
          v-model="pwd"
          @blur="password"
          maxlength="16"
          minlength="6"
          :disabled="disabled"
        />
        <div class="msg2">{{ this.msg_pwd }}</div>
      </div>
    </div>
    <!-- dialog -->
    <!-- 确认按钮 -->
    <div class="mdl_login_btn" @click="enter">
      <img src="../../assets/images/radius.png" alt="" />
      <span>确认</span>
    </div>
  </div>
</template>
<script>
import mix from "./changePsd-mixins.js";
export default {
  mixins: [mix]
};
</script>
<style scoped>
 @import './changePsd.css'
</style>
