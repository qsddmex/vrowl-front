// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
  },
  {
    path: '/classes',
    name: 'Aulas',
    component: () => import(/* webpackChunkName: "classes" */ '@/views/Classes.vue'),
  },
  {
    path: '/uploads',
    name: 'Uploads',
    component: () => import(/* webpackChunkName: "uploads" */ '@/views/Uploads.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
