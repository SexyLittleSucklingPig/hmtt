import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const My = () => import('@/views/My')
const Question = () => import('@/views/Question')
const Login = () => import('@/views/Login')
const Search = () => import('@/views/Search')
const Article = () => import('@/views/Article')
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
    path: '/search',
    component: Search
  },
  {
    path: '/article/:article_id',
    name: 'article',
    props: true, // params相关的路由让组件和路由解耦
    component: Article
  }
]

const router = new VueRouter({
  routes
})

export default router
