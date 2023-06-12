import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/pages/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/pages/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/pages/ContactView.vue')
    },
    {
      path: '/agetur',
      name: 'agetur',
      component: () => import('../views/pages/AgenturView.vue')
    }
  ]
})

export default router
