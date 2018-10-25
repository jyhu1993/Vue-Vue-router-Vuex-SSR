import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    name: 'app',
    path: '/app',
    component: Todo,
    // 异步路由
    // component: () => import('../views/todo/todo.vue'),
    meta: {
      title: 'this is app',
      description: ' '
    },
    beforeEnter (to, from, next) {
      console.log('app route before enter')
      next()
    }
    // 嵌套路由
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: Login
  }
]
