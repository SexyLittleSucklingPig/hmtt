import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const My = () => import('@/views/My')
const Question = () => import('@/views/Question')
const Login = () => import('@/views/Login')
const Searah = () => import('@/views/Search')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/video',
        component: Video
      },
      {
        path: '/my',
        name: 'my',
        component: My
      },
      {
        path: '/question',
        component: Question
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/serch',
    component: Searah
  }
]

const router = new VueRouter({
  routes
})

export default router
