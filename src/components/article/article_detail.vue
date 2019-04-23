<template>
  <div class="container">
    <div class="container2" :style="flags ? 'display:none' : ''">
      <!-- 主体部分 -->
      <div class="content">
        <!-- 病例详情信息 -->
        <div class="top_detail">
          <img :src="$config.url + article.thumbnail" alt="" />
          <h1>{{ article.post_title }}</h1>
          <div class="text">
            <span
              >主讲专家:&nbsp;&nbsp;{{
                article.speak_name
              }}&nbsp;&nbsp;&nbsp;&nbsp;病种:&nbsp;&nbsp;{{
                article.description
              }}</span
            >
          </div>
          <div class="vote">
            <span>{{ article.post_like }}</span>
            <span>票</span>
          </div>
        </div>
        <!-- 专家信息 -->
        <div class="introduce">
          <div class="title">专家介绍</div>
          <div class="detail">
            <img :src="$config.url + article.speak_avatar" alt="" />
            <h1>{{ article.speak_name }}</h1>
            <ul class="dtl">
              <li>{{ article.speak_job_name }}</li>
              <li>{{ article.speak_one }}</li>
              <li>{{ article.speak_two }}</li>
            </ul>
          </div>
          <div class="intro">
            {{ article.speak_info }}
          </div>
        </div>
        <div class="bgc"></div>
        <!-- 医生点评 -->
        <div class="review">
          <div class="title">医生点评</div>
          <div class="audio">
            <!-- 这里放点评内容 -->
            <audio :src="article.audio" controls></audio>
          </div>
        </div>
        <div class="bgc"></div>
        <!-- 病例介绍 -->
        <div class="cases">
          <div class="title">案例介绍</div>
          <ul>
            <li v-html="article.post_content"></li>
          </ul>
        </div>
        <div class="bgc"></div>
      </div>
      <div class="bgc"></div>
      <!-- 评论 -->
      <mt-loadmore
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :auto-fill="true"
        ref="loadmore"
      >
        <div class="comments">
          <div class="pinglun">评论</div>
          <div class="number">{{ article.comment_count }}条</div>
          <div class="bgc"></div>
          <div class="comments_dtl">
            <h1 style="text-align:center;color:#333; margin:0.3rem 0;">
              {{ flag ? "暂时没有评论,请先评论一条吧!" : "" }}
            </h1>
            <ul>
              <li v-for="item in comments_arr" :key="item.cid">
                <img
                  src="../../assets/images/user.png"
                  alt=""
                  v-if="item.avatar == ''"
                />
                <img :src="$config.url + item.avatar" alt="" v-else />
                <h1 v-if="item.nick_name == '' || item.nick_name == null">
                  美敦力{{ PrefixInteger(item.user_id, 4) }}
                </h1>
                <h1 v-else>{{ item.nick_name }}</h1>
                <div class="art">{{ item.content }}</div>
                <div class="time">
                  <!-- <template> -->
                  {{ (item.create_time * 1000) | dateFormat }}
                  <!-- </template> -->
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div slot="bottom" class="mint-loadmore-top">
          <span v-show="bottomStatus === 'loading'">Loading...</span>
        </div>
      </mt-loadmore>
      <!-- 底部tabbar -->
      <div class="bottom">
        <input
          type="text"
          placeholder="说说你的看法"
          v-model="comments_input"
        />
        <button
          @click="comments(article.id, article.sid, article.commoent_content)"
        >
          评论
        </button>
        <button @click="doLike(article.id)">投票</button>
      </div>
    </div>
    <!-- 解决数据延迟刷新问题 -->
    <div class="container1" :style="flags ? '' : 'display:none'">
      <mt-spinner
        type="double-bounce"
        color="#26a2ff"
        :size="60"
        style="opacity:.6"
      ></mt-spinner>
      <div style="color:#7c7c7c">加载中....</div>
    </div>
  </div>
</template>
<script>
import mix from "./article-mixins.js";
export default {
  mixins: [mix]
};
</script>
<style scoped>
 @import './article.css'
</style>
