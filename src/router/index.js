import { createRouter, createWebHistory } from 'vue-router'

// App.vue renders the active portfolio section itself; this satisfies Vue Router's
// route-record contract without introducing a second, nested rendering surface.
const PortfolioRoute = {
  name: 'PortfolioRoute',
  render: () => null,
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'overview', component: PortfolioRoute },
    { path: '/experience', name: 'experience', component: PortfolioRoute },
    { path: '/tech-stack', name: 'skills', component: PortfolioRoute },
    { path: '/about', name: 'about', component: PortfolioRoute },
  ],
})

export default router
