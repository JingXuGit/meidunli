<template>
  <div class="container">
    <div class="content">
      <!-- 登录logo -->
      <div class="mdl_login">
        <img src="../assets/images/login.png" alt="" />
      </div>
      <!-- 投票系统和logo -->
      <div class="vote">
        <img src="../assets/images/logo.png" alt="" />
        <span>美敦力内部投票系统</span>
      </div>
      <!-- 登录表单 -->
      <div class="mdl_form">
        <input
          type="text"
          placeholder="请输入账号"
          :class="flag ? 'rule_tel' : ''"
          v-model="login_form.mobile"
          @blur="input"
        />
        <div class="msg">{{ this.msg_tel }}</div>
        <input
          type="password"
          placeholder="请输入密码"
          :class="flag1 ? 'rule_pwd' : ''"
          v-model="login_form.user_pass"
          @blur="password"
          maxlength="16"
          minlength="6"
        />
        <div class="msg1">{{ this.msg_pwd }}</div>
      </div>
      <!-- 操作 -->
      <div class="operation">
        <span @click="toChangePsd">忘记密码?</span>
      </div>
    </div>
    <!-- 登录按钮 -->
    <div class="mdl_login_btn">
      <img src="../assets/images/radius.png" alt="" />
      <span @click="success">登录</span>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      login_form: {
        mobile: "",
        user_pass: ""
      },
      flag: false,
      flag1: false,
      msg_tel: "",
      msg_pwd: ""
    };
  },
  methods: {
    /* 去修改密码页 */
    toChangePsd() {
      this.$router.push("/changePsd");
    },
    /* 登录 */
    async success() {
      var reg = /[\u4E00-\u9FA5]/g;
      if (
        this.login_form.mobile == "" ||
        this.login_form.user_pass == "" ||
        reg.test(this.login_form.mobile) ||
        this.login_form.user_pass.length < 6 ||
        this.login_form.user_pass.length > 16
      ) {
        if (
          this.login_form.mobile == "" ||
          this.login_form.mobile == undefined
        ) {
          this.flag = true;
          this.msg_tel = "账号不能为空";
        } else if (reg.test(this.login_form.mobile)) {
          this.flag = true;
          this.msg_tel = "账号格式错误";
          return false;
        } else {
          this.flag = false;
          this.msg_tel = "";
        }
        if (
          this.login_form.user_pass == "" ||
          this.login_form.user_pass == undefined
        ) {
          this.flag1 = true;
          this.msg_pwd = "密码不能为空";
        } else if (
          this.login_form.user_pass.length < 6 ||
          this.login_form.user_pass.length > 16
        ) {
          this.flag1 = true;
          this.msg_pwd = "密码长度错误!长度应为6-16位密码";
        } else {
          this.flag1 = false;
          this.msg_pwd = "";
        }
      } else {
        var p = this.$param(this.login_form);
        const { data: data } = await this.$http.post("users/login", p);
        console.log(data);
        if (data.code != 1) {
          this.flag1 = true;
          this.msg_pwd = data.msg;
          window.localStorage.removeItem("user_token");
          window.localStorage.removeItem("user_id");
        } else {
          window.localStorage.setItem("user_token", data.data.token);
          window.localStorage.setItem("user_id", data.data.id);
          Toast({
            message: "登录成功",
            position: "middle",
            duration: 1000
          });
          this.$router.push("/center");
        }
      }
    },
    /* 输入框事件 */
    input() {
      var reg = /[\u4E00-\u9FA5]/g;
      if (reg.test(this.login_form.mobile)) {
        this.flag = true;
        this.msg_tel = "账号格式错误";
      } else {
        this.flag = false;
        this.msg_tel = "";
      }
    },
    password() {
      if (
        this.login_form.user_pass == "" ||
        this.login_form.user_pass == undefined
      ) {
        this.flag1 = true;
        this.msg_pwd = "密码不能为空";
      } else if (
        this.login_form.user_pass.length < 6 ||
        this.login_form.user_pass.length > 16
      ) {
        this.flag1 = true;
        this.msg_pwd = "密码长度错误!长度应为6-16位密码";
      } else {
        this.flag1 = false;
        this.msg_pwd = "";
      }
    }
  }
};
</script>
<style scoped>
.content {
  margin: 1.1rem 0;
  margin-left: 0.5rem;
  margin-bottom: 0;
}
.mdl_login img {
  width: 1.35rem;
}
.mdl_login {
  margin-right: 0.5rem;
}
.vote {
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  height: 0.58rem;
  display: flex;
}
.vote img {
  width: 2rem;
  height: 0.58rem;
  align-items: top;
}
.vote span {
  font-size: 0.36rem;
  font-family: PingFangSC-Regular;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  margin-left: 0.3rem;
  align-items: top;
}
.mdl_form {
  margin-right: 0.5rem;
  margin-top: 0.7rem;
  position: relative;
}
.mdl_form input:first-child {
  margin-top: 0;
}
.mdl_form input {
  padding: 0.2rem;
  margin: 0.4rem 0;
  border: none;
  background-color: #fff;
  width: 100%;
  text-indent: 0;
  border-bottom: 1px solid rgba(229, 229, 229, 1);
  font-size: 0.34rem;
  color: #333;
  box-sizing: border-box;
}
.mdl_form input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: rgba(217, 217, 217, 1);
}
.mdl_form input:-moz-placeholder {
  color: rgba(217, 217, 217, 1);
}
.mdl_form input::-moz-placeholder {
  color: rgba(217, 217, 217, 1);
}
.mdl_form input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: rgba(217, 217, 217, 1);
}
.operation {
  position: relative;
  margin-bottom: 1.05rem;
}
.operation span {
  text-align: right;
  font-size: 0.3rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 133, 202, 1);
  line-height: 36px;
  position: absolute;
  right: 0.5rem;
}
.mdl_login_btn {
  /* margin-top: 1.05rem; */
  width: 6.87rem;
  height: 1.35rem;
  position: absolute;
  left: 50%;
  margin-left: -3.43rem;
}
.mdl_login_btn img {
  width: 6.87rem;
  height: 1.35rem;
}
.mdl_login_btn span {
  position: absolute;
  width: 6.87rem;
  height: 1.35rem;
  margin-top: -1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.36rem;
  color: rgba(255, 255, 255, 1);
}
/* 手机号码 密码校验 */
.rule_tel {
  border: 1px solid #f56c6c !important;
  border-radius: 5px;
}
.rule_pwd {
  border: 1px solid #f56c6c !important;
  border-radius: 5px;
}
.msg {
  font-size: 0.23rem;
  color: #f56c6c;
  position: absolute;
  top: 1rem;
}
.msg1 {
  font-size: 0.23rem;
  color: #f56c6c;
  position: absolute;
  top: 2.65rem;
}
</style>
