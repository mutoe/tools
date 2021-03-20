import Home from 'src/components/Home.vue'
import Timer from 'src/components/Timer.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/timer', component: Timer },
  ],
})
