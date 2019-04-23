import { Toast } from "mint-ui";
export default {
  data() {
    return {
      tel: "",
      yzm: "",
      pwd: "",
      flag: false,
      flag1: false,
      flag2: false,
      msg_tel: "",
      msg_yzm: "",
      msg_pwd: "",
      gray: false,
      seconds: 60,
      msg: "获取验证码",
      disabled: true,
      disabled1: true
    };
  },
  methods: {
    navigate() {
      this.$router.push("/");
    },
    async enter() {
      if (
        this.tel != "" &&
        this.yzm != "" &&
        this.pwd != "" &&
        this.pwd.length >= 6
      ) {
        let param = new URLSearchParams();
        param.append("mobile", this.tel);
        param.append("user_pass", this.pwd);
        param.append("code", this.yzm);
        param.append("token", window.localStorage.getItem("token"));
        const { data: data } = await this.$http.post("/users/resetpwd", param);
        console.log(data);
        if (data.code == 1) {
          Toast({
            message: data.msg,
            position: "middle",
            duration: 3000
          });
          this.$router.push("/");
        } else {
        }
      } else {
        Toast({
          message: "请先获取验证码",
          position: "bottom",
          duration: 3000
        });
      }
    },
    async getYzm() {
      this.disabled1 = false;
      let reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (this.tel == "") {
        if (this.tel == "" || this.tel == undefined) {
          this.flag = true;
          this.msg_tel = "手机号码不能为空";
        } else if (!reg.test(this.tel)) {
          this.flag = true;
          this.msg_tel = "手机号码格式错误";
          return false;
        } else {
          this.flag = false;
          this.msg_tel = "";
        }
      } else {
        /* 调用接口获取验证码 */
        /* 按钮变灰色 */
        /* 处理验证码倒计时问题 */
        this.gray = true;
        let _this = this;
        let clear = setInterval(function () {
          if (_this.seconds == 0) {
            _this.gray = false;
            _this.msg = "重新获取";
            _this.seconds = 60;
            clearInterval(clear);
          } else {
            _this.gray = true;
            _this.seconds--;
          }
        }, 1000);
        let param = new URLSearchParams();
        param.append("mobile", this.tel);
        param.append("token", window.localStorage.getItem("token"));
        const { data: data } = await this.$http.post("/users/sendSms", param);
        console.log(data);
      }
    },
    telphone() {
      let reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (!reg.test(this.tel)) {
        this.flag = true;
        this.msg_tel = "手机号码格式错误";
      } else {
        this.flag = false;
        this.msg_tel = "";
      }
    },
    yanzhengma() {
      if (this.yzm == "" || this.yzm == undefined) {
        this.flag1 = true;
        this.msg_yzm = "验证码不能为空";
      } else if (this.yzm.length < 4 || this.yzm.length > 4) {
        this.flag1 = true;
        this.msg_yzm = "验证码长度错误";
      } else {
        this.disabled = false;
        this.flag1 = false;
        this.msg_yzm = "";
      }
    },
    password() {
      if (this.pwd == "" || this.pwd == undefined) {
        this.flag2 = true;
        this.msg_pwd = "密码不能为空";
      } else if (this.pwd.length < 6 || this.pwd.length > 10) {
        this.flag2 = true;
        this.msg_pwd = "密码长度错误 应为6-10位密码";
      } else {
        this.flag2 = false;
        this.msg_pwd = "";
      }
    },
    maxlength() {
      if (this.yzm.length > 4) this.yzm = this.yzm.slice(0, 4);
    }
  }
}