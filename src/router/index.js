import Vue from 'vue'
// import { createApp } from 'vue'
import VueRouter from 'vue-router'
// import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')

//1.安装插件
Vue.use(VueRouter)
// createApp().use(VueRouter)

//2.创建router
const routes = [
    {
        path: '',
        redirect: '/home'
    },    
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    },
]

const router = new VueRouter({
    routes,
    mode: 'history' //不加这个显示哈希#
})

// const router = createRouter({
//     history: createWebHashHistory(),
//     routes
// })

export default router