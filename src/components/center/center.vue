<template>
  <div class="container">
    <!-- 顶部背景 -->
    <div class="mdl_bgimg">
      <img src="../../assets/images/bgimg.png" alt="" />
      <div class="mdl_user">
        <div class="img_box">
          <img
            src="../../assets/images/user.png"
            alt=""
            v-if="userList.avatar == ''"
          />
          <img :src="$config.url + userList.avatar" alt="" v-else />
        </div>
        <span class="btn btn-success fileinput-button">
          <span class="edit">编辑头像</span>
          <input name="file" type="file" @change="add_img" />
        </span>
        <!-- <mt-actionsheet :actions="actions" v-model="sheetVisible">
        </mt-actionsheet> -->
      </div>
    </div>
    <!-- 主题内容部分 -->
    <div class="content">
      <ul>
        <li class="list" @click="user_click(1)">
          <span class="information_left">昵称</span>
          <span class="information_right">
            {{ userList.nick_name }}
          </span>
        </li>
        <li class="list" @click="user_click(2)">
          <span class="information_left">部门</span>
          <span class="information_right">
            {{ userList.branch }}
          </span>
        </li>
        <li class="list" @click="user_click(3)">
          <span class="information_left">性别</span>
          <span class="information_right"> {{ userList.sex }}</span>
        </li>
        <li class="list">
          <span class="information_left">手机号码</span>
          <span class="information_right">{{ userList.mobile }}</span>
        </li>
      </ul>
    </div>
    <div class="bg" :style="flag ? '' : 'display:none'" @click="cancle"></div>
    <!-- 弹出框 -->
    <div class="dialog" :style="flag ? '' : 'display:none'">
      <h1 style="text-align:center;margin-top:0.2rem;">修改用户信息</h1>
      <div style="margin-top:0.2rem;">
        <mt-field
          label="昵称"
          placeholder="请输入昵称"
          v-model="userList.nick_name"
          v-if="num == 1"
        ></mt-field>
        <mt-field
          label="部门"
          placeholder="请输入部门"
          v-model="userList.branch"
          v-else-if="num == 2"
        ></mt-field>
        <mt-field
          label="性别"
          placeholder="请输入性别"
          v-model="userList.sex"
          v-else-if="num == 3"
        ></mt-field>
        <mt-field
          label="手机号码"
          placeholder="请输入手机号码"
          v-model="userList.mobile"
          v-else-if="num == 4"
        ></mt-field>
      </div>
      <div class="btm">
        <span style="text-align:center;">
          <mt-button
            type="primary"
            size="small"
            class="enter"
            @click="editEnter"
            >确认</mt-button
          >
          <mt-button type="danger" size="small" class="danger" @click="cancle"
            >取消</mt-button
          >
        </span>
      </div>
    </div>
    <!-- 确认按钮 -->
    <div class="mdl_login_btn" @click="logout">
      <img src="../../assets/images/radius.png" alt="" />
      <span>退出登录</span>
    </div>
    <!-- 底部tabbar -->
    <bottom-tabBar></bottom-tabBar>
  </div>
</template>
<script>
import mix from "./center-mixins.js";
import bottomShow from "../btm_tabBar.vue";
export default {
  mixins: [mix],
  components: {
    "bottom-tabBar": bottomShow
  }
};
</script>
<style scoped>
@import "./center.css";
</style>
