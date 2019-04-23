import Vue from 'vue'
import Router from 'vue-router'
/* 登录页 */
import login from '@/components/Login'
/* 修改密码页 */
import changePsd from '@/components/changePsd/ChangePsd'
/* 个人中心 */
import center from '@/components/center/center'
/* 首页 */
import index from '@/components/index/index'
import article from '@/components/article/article_detail'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/changePsd',
      name: 'changePsd',
      component: changePsd,
      meta: {
        keepAlive: false, //此组件不需要被缓存
        title: '修改密码'
      }
    },
    {
      path: '/center',
      name: 'center',
      component: center,
      meta: {
        keepAlive: true, //此组件不需要被缓存.
        title: '个人中心'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        keepAlive: true, //此组件不需要被缓存
        title: '首页'
      }
    },
    {
      path: '/article',
      name: 'article',
      component: article,
      meta: {
        keepAlive: false, //此组件不需要被缓存
        title: '案例详情'
      }
    }
  ]
})
router.beforeEach(async (to, from, next) => {
  // 如果访问的 login 页面，直接放行
  let token = window.localStorage.getItem("token");
  if (to.path == '/changePsd') return next()
  if (to.path === '/') {
    if (token) {
      return next({
        path: '/center'
      })
    }
    return next();
  }
  if (!token) return next('/')
  // 证明有 token 字符串，直接放行
  next()
})
// 把路由对象暴露出去
export default router 
