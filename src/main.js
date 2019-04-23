import Vue from 'vue'
import App from './App'
import router from './router'
import flexble from './assets/flexble'
import Mint from 'mint-ui';
import Axios from 'axios'
import Param from './func'
import config from './config'
import './assets/css/base.css'
import './assets/fonts/iconfont.css'
import 'mint-ui/lib/style.css'
Axios.defaults.baseURL = config.url + '/home/'
Axios.interceptors.request.use(config => {
  return config
})
Axios.interceptors.response.use(config => {
  if (config.data.code == 1001) {
    window.localStorage.removeItem('token')
    router.push({ path: '/' })
  }
  return config
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
/* 定义全局时间过滤器 */
Vue.filter('dateFormat', function (originVal) {
  const date = new Date(originVal)
  const Y = date.getFullYear();
  const M = (date.getMonth() + 1 + '').padStart(2, '0');
  const D = (date.getDate() + '').padStart(2, '0')
  const H = (date.getHours() + '').padStart(2, '0')
  const I = (date.getMinutes() + '').padStart(2, '0')
  const S = (date.getSeconds() + '').padStart(2, '0')
  return `${Y}-${M}-${D} ${H}:${I}:${S}`
})
Vue.prototype.$param = Param
Vue.prototype.$http = Axios
Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.use(flexble)
Vue.use(Mint);
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
