import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Chart from '../components/Chart.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
},
{
    path: '/home',
    component: Home
},
{
    path: '/chart',
    component: Chart
}]

const router = new VueRouter({
    routes
})

export default router
