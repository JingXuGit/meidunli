<template>
  <div class="bottom">
    <div class="mdl_left" @click="index">
      <img src="../assets/images/index.png" alt="" />
      <span>首页</span>
    </div>
    <div class="mdl_right" @click="center">
      <img src="../assets/images/center_active.png" alt="" />
      <span style=" color:#0085CA; font-size:0.20rem;">我的</span>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    index() {
      this.$router.push("/index");
    },
    center() {
      this.$router.push("/center");
    }
  }
};
</script>
<style scoped>
.bottom {
  height: 0.98rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  border-top: 1px solid rgba(230, 230, 230, 1);
  background-color: #fff;
}
.bottom div {
  height: 0.98rem;
  width: 49%;
  display: inline-block;
  text-align: center;
  margin-top: 0.09rem;
}
.bottom div img {
  width: 0.44rem;
  height: 0.4rem;
}
.bottom div span {
  font-size: 0.2rem;
  color: rgba(203, 203, 211, 1);
  position: absolute;
  top: 0.6rem;
  width: 0.7rem;
}
.bottom .mdl_left span {
  left: 24.5%;
  margin-left: -0.35rem;
}
.bottom .mdl_right span {
  right: 25.5%;
  margin-right: -0.35rem;
}
</style>

