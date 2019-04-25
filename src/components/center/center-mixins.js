import { Actionsheet, Toast, Button } from "mint-ui";
import cos from "../../CosAuth";

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
      window.localStorage.removeItem("user_token");
      window.localStorage.removeItem("user_id");
      this.$router.push("/");
    },
    index() {
      this.$router.push("/index");
    },
    center() {
      this.$router.push("/center");
    },
    /* 上传到腾讯云 */
    async add_img(e) {
      let file = e.target.files[0];
      if (!file) return;
      cos.sliceUploadFile({
        Bucket: this.$config.Bucket,
        Region: this.$config.Region,
        Key: file.name,
        Body: file,
        onHashProgress: function (progressData) {
        },
        onProgress: function (progressData) {
        },
      }, (err, data) => {
        if (err) return this.Toast2('上传失败!')
        if (data.statusCode == 200) {
          this.updateHeader(data.Location)
        }
      });
    },
    /* 入库 */
    async updateHeader(imgurl) {
      let param = new URLSearchParams();
      if (imgurl.indexOf('http') != 0) {
        imgurl = 'https://' + imgurl;
      }
      param.append("avatar", imgurl);
      param.append("id", window.localStorage.getItem("user_id"));
      param.append("token", window.localStorage.getItem("user_token"));
      const { data: data } = await this.$http.post("/Users/editPost", param);
      this.userList.avatar = data.data.avatar;
    },
    // 获取用户信息
    async getUserMsg() {
      let param = new URLSearchParams();
      param.append("id", window.localStorage.getItem("user_id"));
      param.append("token", window.localStorage.getItem("user_token"));
      const { data: data } = await this.$http.post("Users/edit", param);
      if (data.code != 1) {
        this.Toast2("获取用户信息失败")
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
      param.append("token", window.localStorage.getItem("user_token"));
      const { data: data } = await this.$http.post("Users/editPost", param);
      console.log(data);
      if (data.code == 1) {
        this.flag = false;
      }
      this.Toast2(data.msg)
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
  }
}