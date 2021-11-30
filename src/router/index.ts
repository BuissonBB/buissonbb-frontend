import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Forum from '../views/Forum.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Authentification',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Authentification.vue')
  },
  {
    path: '/chat/:chatId',
    name: 'Chat',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Chat.vue')
  },
  {
    path: '/forum/:forum',
    name: 'Forum',
    component: Forum
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
