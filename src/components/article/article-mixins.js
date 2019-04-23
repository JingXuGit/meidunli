import { Toast } from "mint-ui";
import { Spinner } from "mint-ui";
export default {
  data() {
    return {
      allLoaded: false,
      article: {},
      comments_input: "",
      page: 1,
      comments_arr: [],
      flag: false,
      flags: false,
      str: {
        page: 1
      },
      bottomStatus: "",
      id: "",
      random: ""
    };
  },
  created() {
    this.article_list(this.$route.query.id);
    this.selects(this.$route.query.id);
    this.id = this.$route.query.id;
  },
  methods: {
    /* 数据列表获取 */
    async article_list(ids) {
      var param = new URLSearchParams();
      this.flags = true;
      param.append("id", ids);
      param.append("token", window.localStorage.getItem("token"));
      const { data: data } = await this.$http.post("case/content", param);
      if (data.code != 1) {
        Toast({
          message: data.msg,
          position: "middle",
          duration: 3000
        });
      }
      this.article = data.data;
      this.flags = false;
    },
    async doLike(id) {
      var param = new URLSearchParams();
      param.append("id", id);
      param.append("token", window.localStorage.getItem("token"));
      param.append("user_id", window.localStorage.getItem("user_id"));
      const { data: data } = await this.$http.post("case/doLike", param);
      if (data.code == 1) {
        Toast({
          message: data.msg,
          position: "middle",
          duration: 1500
        });
        this.article.post_like = this.article.post_like + 1;
        // this.article_list(id);
      } else if (data.code == 0) {
        Toast({
          message: data.msg,
          position: "middle",
          duration: 1500
        });
      }
    },
    /* 发表评论 */
    async comments(object_id, sid) {
      if (this.comments_input == "") {
        Toast({
          message: "请输入评论内容",
          position: "middle",
          duration: 3000
        });
      } else {
        let param = new URLSearchParams();
        param.append("object_id", object_id);
        param.append("to_user_id", sid);
        param.append("content", this.comments_input);
        param.append("user_id", window.localStorage.getItem("user_id"));
        param.append("token", window.localStorage.getItem("token"));
        const { data: data } = await this.$http.post("Comment/addPost", param);
        if (data.code != 1) {
          Toast({
            message: "评论失败",
            position: "middle",
            duration: 1000
          });
        } else {
          Toast({
            message: "评论成功!",
            position: "middle",
            duration: 3000
          });
          // this.article_list(object_id);
          this.article.comment_count = this.article.comment_count + 1;
          this.comments_input = "";
          this.selects(object_id);
        }
      }
    },
    /* 评论展示 */
    async selects(id) {
      let param = new URLSearchParams();
      param.append("id", id);
      param.append("page", this.page);
      param.append("token", window.localStorage.getItem("token"));
      const { data: data } = await this.$http.post("Comment/selects", param);
      if (data.code != 1) {
        Toast({
          message: "获取评论失败!",
          position: "middle",
          duration: 1000
        });
      } else {
        if (data.data.length <= 0) {
          this.flag = true;
        } else {
          this.comments_arr = data.data;
          this.flag = false;
        }
      }
    },
    /* 上拉刷新 */
    async loadBottom(id) {
      this.allLoaded = false; // 若数据已全部获取完毕
      this.bottomStatus = "loading";
      this.str.page = this.str.page + 1;
      let param = new URLSearchParams();
      param.append("page", this.str.page);
      param.append("id", this.id);
      param.append("token", window.localStorage.getItem("token"));
      const { data: data } = await this.$http.post("comment/selects", param);
      if (data.data.length <= 0) {
        this.str.page = this.str.page - 1;
        this.bottomStatus = "没有更多数据!";
      } else {
        this.allLoaded = false;
        var datas = data.data;
        for (var i = 0; i < datas.length; i++) {
          this.comments_arr.push(datas[i]);
        }
      }
      this.$refs.loadmore.onBottomLoaded();
    },
    /* 处理随机昵称 */
    PrefixInteger(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    },
  }
}