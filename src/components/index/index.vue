<template>
  <div class="container">
    <!-- 搜索框 -->
    <div class="top_form" @touchmove.prevent>
      <img src="../../assets/images/search.png" alt="" />
      <input
        type="text"
        placeholder="请输入搜索关键字"
        v-model="search"
        @input="input_blur"
      />
      <span
        :class="flags ? 'del icon-shanchu iconfont' : ''"
        @click="cancle_input"
      ></span>
      <span class="cancle" @click="searchInput">搜索</span>
    </div>
    <!-- 下拉框 -->
    <div class="select" @touchmove.prevent>
      <div class="select_left" @click="click_select(1)">
        <span :class="flag ? 'active' : ''">{{ cases }}</span>
        <span
          :class="
            'iconfont ' + (flag ? 'icon-shang' : 'icon-icon-arrow-bottom2')
          "
        ></span>
        <img
          src="../../assets/images/sanjiao.png"
          alt=""
          :class="'sanjiao ' + (flag ? '' : 'hide')"
        />
      </div>
      <i class="border"></i>
      <div class="select_right" @click="click_select(2)">
        <span :class="flag1 ? 'active' : ''">{{ screening }}</span>
        <span
          :class="
            'iconfont ' + (flag1 ? 'icon-shang' : 'icon-icon-arrow-bottom2')
          "
        ></span>
        <img
          src="../../assets/images/sanjiao.png"
          alt=""
          :class="'sanjiao ' + (flag1 ? '' : 'hide')"
        />
      </div>
    </div>
    <!-- 主体部分 -->
    <div class="content">
      <!-- 弹出框 病种分类 -->
      <div :class="'dialog ' + (flag ? '' : 'hide')" @touchmove.prevent>
        <ul>
          <li
            @click="caseClick(item.cases, item.pid)"
            v-for="item in casesArr"
            :key="item.pid"
          >
            {{ item.cases }}
          </li>
        </ul>
      </div>
      <!--弹出框 筛选 -->
      <div :class="'dialog ' + (flag1 ? '' : 'hide')">
        <ul>
          <li
            v-for="item in screeningArr"
            :key="item.id"
            @click="screenClick(item.cases, item.order_type)"
          >
            {{ item.cases }}
          </li>
        </ul>
      </div>
      <!-- 内容文章 -->
      <mt-loadmore
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :auto-fill="true"
        ref="loadmore"
      >
        <div class="article">
          <ul>
            <li
              class="list"
              @click="navigateTo(item.id)"
              v-for="item in arrList"
              :key="item.id"
            >
              <h1>
                {{ item.post_title }}
              </h1>
              <div class="text">
                <span
                  >主讲专家:&nbsp;&nbsp; {{ item.speak_name }}&nbsp;&nbsp;
                  &nbsp;病种:&nbsp;&nbsp;{{ item.name }}</span
                >
              </div>
              <div
                style="color:rgba(128,128,128,1); font-size:0.22rem; margin-top:0.1rem;"
              >
                <span>{{
                  item.post_like == null ? (item.post_like = 0) : item.post_like
                }}</span
                >票 &nbsp;&nbsp;
                <!-- <span>{{item.order_num}}</span> -->
                <!-- <span>
                  {{ (item.create_time * 1000) | dateFormat }}
                </span> -->
              </div>
              <img
                :src="item.thumbnail"
                alt=""
                class="illness_img"
              />
            </li>
          </ul>
        </div>
        <div slot="bottom" class="mint-loadmore-top">
          <span v-show="bottomStatus === 'loading'">Loading...</span>
        </div>
      </mt-loadmore>
    </div>
    <!-- 遮罩层 -->
    <div :class="'bg ' + (flag || flag1 ? '' : 'hide')" @touchmove.prevent>
    </div>
    <!-- 底部tabbar -->
    <div class="bottom">
      <div class="mdl_left" @click="index">
        <img src="../../assets/images/index_active.png" alt="" />
        <span style=" color:#0085CA;font-size:0.20rem;">首页</span>
      </div>
      <div class="mdl_right " @click="center">
        <img src="../../assets/images/center.png" alt="" />
        <span>我的</span>
      </div>
    </div>
  </div>
</template>
<script>
import mix from "./index.mixins.js";
export default {
  mixins: [mix],
};
</script>
<style scoped>
@import "./index.css";
</style>
