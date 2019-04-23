import { Actionsheet } from "mint-ui";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      allLoaded: false,
      flag: false,
      flag1: false,
      cases: "全部",
      screening: "综合",
      bottomStatus: "",
      str: {
        order_type: 1,
        page: 1,
        token: window.localStorage.getItem("token")
      },
      search: "",
      flags: false,
      casesArr: [
        { pid: 4, cases: "全部" },
        { pid: 1, cases: "糖尿病" },
        { pid: 2, cases: "痛风/高尿酸血症" },
        { pid: 3, cases: "甲状腺疾病" }
      ],
      screeningArr: [
        { order_type: 1, cases: "综合" },
        { order_type: 2, cases: "按票数" },
        { order_type: 3, cases: "按时间" }
      ],
      arrList: []
    };
  },
  created() {
    this.indexList();
  },
  methods: {
    index() {
      this.$router.push("/index");
    },
    center() {
      this.$router.push("/center");
    },
    navigateTo(id) {
      this.$router.push("/article?id=" + id);
    },
    /* 点击下拉框 */
    click_select(num) {
      if (num == 1) {
        this.flag = !this.flag;
        this.flag1 = false;
      } else {
        this.flag1 = !this.flag1;
        this.flag = false;
      }
    },
    /* 页面展示数据 */
    async indexList() {
      var p = this.$param(this.str);
      const { data: data } = await this.$http.post("case/index", p);
      if (data.code != 1) {
        Toast({
          message: data.msg,
          position: "middle",
          duration: 1000
        });
      } else {
        this.arrList = data.data;
      }
    },
    /* 病种筛选 */
    async caseClick(e, pid) {
      if (pid != 4) {
        var param = new URLSearchParams();
        this.cases = e;
        this.flag = !this.flag;
        this.flag1 = false;
        this.page = 1;
        window.sessionStorage.setItem("post_type", pid);
        param.append("post_type", pid);
        param.append("page", "0");
        param.append("order_type", this.str.order_type);
        param.append("token", window.localStorage.getItem("token"));
        const { data: data } = await this.$http.post("case/index", param);
        if (data.data.length > 0) {
          this.arrList = data.data;
        } else {
          Toast({
            message: "没有更多数据",
            position: "middle",
            duration: 1000
          });
          this.arrList = [];
        }
      } else {
        this.cases = e;
        this.flag = !this.flag;
        this.flag1 = false;
        this.indexList();
      }
    },
    /* 筛选 */
    async screenClick(e, id) {
      if (id != 1) {
        var param = new URLSearchParams();
        this.screening = e;
        this.flag1 = !this.flag1;
        this.flag = false;
        this.page = 1;
        if (this.cases == "全部") {
          window.sessionStorage.removeItem("post_type");
        }
        if (
          window.sessionStorage.getItem("post_type") != "" &&
          window.sessionStorage.getItem("post_type") != undefined
        ) {
          param.append("post_type", window.sessionStorage.getItem("post_type"));
        }
        param.append("page", "0");
        param.append("order_type", id);
        param.append("token", window.localStorage.getItem("token"));
        const { data: data } = await this.$http.post("case/index", param);
        if (data.data.length > 0) {
          this.arrList = data.data;
        } else {
          Toast({
            message: "没有更多数据",
            position: "middle",
            duration: 1000
          });
          this.arrList = [];
        }
      } else {
        this.screening = e;
        this.flag1 = !this.flag1;
        this.flag = false;
        this.indexList();
      }
    },
    /* 点击取消还原所有 */
    async searchInput() {
      this.page = 0;
      if (this.search == "" || this.search == undefined) {
        this.indexList();
      }
      var param = new URLSearchParams();
      param.append("page", "1");
      param.append("keyword", this.search);
      param.append("order_type", 2);
      param.append("token", window.localStorage.getItem("token"));
      const { data: data } = await this.$http.post("case/index", param);
      if (data.data.length > 0) {
        this.arrList = data.data;
      } else {
        Toast({
          message: "没有更多数据",
          position: "middle",
          duration: 2000
        });
        this.arrList = [];
      }

    },
    /* 上拉刷新 */
    async loadBottom(id) {
      this.allLoaded = false; // 若数据已全部获取完毕
      this.bottomStatus = "loading";
      this.str.page = this.str.page + 1;
      var p = this.$param(this.str);
      const { data: data } = await this.$http.post("case/index", p);
      if (data.data.length <= 0) {
        this.str.page = this.str.page - 1;
        /* TODO*/
        this.bottomStatus = "没有更多数据!";
      } else {
        this.allLoaded = false;
        var datas = data.data;
        for (var i = 0; i < datas.length; i++) {
          this.arrList.push(datas[i]);
        }
      }
      this.$refs.loadmore.onBottomLoaded();
    },
    /* 清空文字 */
    cancle_input() {
      this.search = "";
      this.flags = false;
      this.indexList();
    },
    input_blur() {
      if (this.search.length > 0) {
        this.flags = true;
      } else {
        this.flags = false;
      }
    }
  }
}