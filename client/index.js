import Vue from 'vue' // 此处引入的是vue.runtime,无法解析template模板，因此需要使用render
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import './assets/styles/global.less'
import createRouter from './config/router.js'
import createStore from './store/store.js'

Vue.use(Vuex)

Vue.use(VueRouter)
const router = createRouter()
const store = createStore()

router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})

router.afterEach((to, from) => {
  console.log('after each invoked')
})



console.log(router)
new Vue({
  router,
  store,
  components: {
    App
  },
  render (createElement) {
    return createElement('App')
  }
}).$mount('#root')
