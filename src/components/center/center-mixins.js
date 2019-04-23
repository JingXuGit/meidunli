import { Actionsheet, Toast, Button } from "mint-ui";
export default {
  data() {
    return {
      imgs: [],
      imgData: {
        accept: "image/gif, image/jpeg, image/png, image/jpg"
      },
      userList: {},
      flag: false,
      num: 0
    };
  },
  created() {
    this.getUserMsg();
  },
  methods: {
    /* TODO */
    async add_img(e) {
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      console.log(file.size);
      // 5242880
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.Toast2("图片尺寸过大!,上传失败!");
      } else {
        param.append("file", file, file.name); //通过append向form对象添加数据
        param.append("token", window.localStorage.getItem("token"));
        const { data: data } = await this.$http.post(
          this.$config.url + "/admin/speak/upload/",
          param
        );
        if (data.code == 1) {
          this.updateHeader(data.data.url);
        } else {
          this.Toast2(data.msg);
        }
      }
    },
    /* 上传图片 */
    async updateHeader(imgurl) {
      let param = new URLSearchParams();
      param.append("avatar", imgurl);
      param.append("id", window.localStorage.getItem("user_id"));
      param.append("token", window.localStorage.getItem("token"));
      const { data: data } = await this.$http.post("/Users/editPost", param);
      this.Toast2(data.msg);
      this.userList.avatar = data.data.avatar;
    },
    // 获取用户信息
    async getUserMsg() {
      let param = new URLSearchParams();
      param.append("id", window.localStorage.getItem("user_id"));
      param.append("token", window.localStorage.getItem("token"));
      const { data: data } = await this.$http.post("Users/edit", param);
      if (data.code != 1) {
        Toast({
          message: "获取用户信息失败",
          position: "middle",
          duration: 1000
        });
      } else {
        this.userList = data.data;
        if (this.userList.sex == 1) {
          this.userList.sex = "男";
        } else if (this.userList.sex == 2) {
          this.userList.sex = "女";
        } else {
          this.userList.sex = "";
        }
      }
    },
    /* 点击编辑确认 */
    async editEnter() {
      let param = new URLSearchParams();
      if (this.num == 1) {
        param.append("nick_name", this.userList.nick_name);
      } else if (this.num == 2) {
        param.append("branch", this.userList.branch);
      } else if (this.num == 3) {
        if (this.userList.sex == "男") {
          param.append("sex", 1);
        } else {
          param.append("sex", 2);
        }
      } else if (this.num == 4) {
        param.append("mobile", this.userList.mobile);
      }
      param.append("id", window.localStorage.getItem("user_id"));
      param.append("token", window.localStorage.getItem("token"));
      const { data: data } = await this.$http.post("Users/editPost", param);
      console.log(data);
      if (data.code == 1) {
        this.flag = false;
      }
      Toast({
        message: data.msg,
        position: "middle",
        duration: 1000
      });
      //   if (data.code != 1) {
      //   Toast({
      //     message: "获取用户信息失败",
      //     position: "middle",
      //     duration: 1000
      //   });
      // } else {
      //   this.userList = data.data;
      // }
    },
    user_click(num) {
      this.flag = true;
      this.num = num;
    },
    /* 点击编辑取消 */
    cancle() {
      this.flag = false;
    },
    Toast2(msg) {
      Toast({
        message: msg,
        position: "middle",
        duration: 1000
      });
    },
    logout() {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user_id");
      this.$router.push("/");
    },
    index() {
      this.$router.push("/index");
    },
    center() {
      this.$router.push("/center");
    }
  },
  
}