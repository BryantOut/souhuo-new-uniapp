import App from './App'
import store from './store'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

// import {router,RouterMount} from './router.js'  //路径换成自己的
// Vue.use(router)

App.mpType = 'app'
const app = new Vue({
  store,
    ...App
})
app.$mount()

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	// RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	// app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

// #endif

import baseUtil from "@/utils/baseUtils";
Vue.prototype.$baseUtil = baseUtil;

const bus = new Vue()
Vue.prototype.$EventBus = bus;

import * as filters from './filters'

// register global utility filters.
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
})

import Skeleton from './components/xinyi-skeleton/skeleton'
Vue.component('Skeleton', Skeleton)

import checkLoginHandler from './mixins/checkLoginHandler'
Vue.mixin(checkLoginHandler)

import LoginPopup from './components/LoginPopup'
Vue.component('LoginPopup', LoginPopup)

import LoginByPhone from '@/components/LoginByPhone'
Vue.component('LoginByPhone', LoginByPhone)

import MyEmpty from './components/MyEmpty'
Vue.component('MyEmpty', MyEmpty)

import AlertTip from './components/AlertTip.vue'
Vue.component('AlertTip', AlertTip)


import PrivacyAgreement from './components/Agreement/PrivacyAgreement'
Vue.component('PrivacyAgreement', PrivacyAgreement)

import UserAgreement from './components/Agreement/UserAgreement.vue'
Vue.component('UserAgreement', UserAgreement)

import wxUtils from '@/utils/wxUtils'
Vue.prototype.$wxUtils = wxUtils;

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
// #endif