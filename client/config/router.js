import Router from 'vue-router'
import routes from './routers.js'

export default () => {
  return new Router({
    routes,
    // 配置mode避免出现#符号
    mode: 'history',
    // 作为应用的基路径,不常用
    // base: '/base/',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    // scrollBehavior () {},
    // // 字符串转为JSON
    // parseQuery () {},
    // // Json转为字符串
    // stringifyQuery () {},
    fallback: false

  })
}
