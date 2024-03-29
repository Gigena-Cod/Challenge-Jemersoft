import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '@/views/HomeView.vue')
  },
  {
    path: '/view-details/:id',
    name: 'viewDetail',
    component: () => import(/* webpackChunkName: "about" */ '@/views/PokemonView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
