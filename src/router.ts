import Home from 'src/views/Home.vue'
import {createRouter , createWebHistory} from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name:'home',component: Home },
    { path: '/timer', name: 'timer',component:() => import('src/views/Timer.vue') },
  ],
})
