import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'overview' },
    { path: '/experience', name: 'experience' },
    { path: '/tech-stack', name: 'skills' },
    { path: '/about', name: 'about' },
  ],
})

export default router
