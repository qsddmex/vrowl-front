// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    meta: {
      title: 'Dashboard',
      description: 'Ea amet veniam velit magna et magna adipisicing non. Ipsum duis fugiat eiusmod laboris enim dolore reprehenderit aliquip Lorem amet.'
    },
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
  },
  {
    path: '/classes',
    name: 'Aulas',
    meta: {
      title: 'Aulas',
      description: 'Ea amet veniam velit magna et magna adipisicing non. Ipsum duis fugiat eiusmod laboris enim dolore reprehenderit aliquip Lorem amet.'
    },
    component: () => import(/* webpackChunkName: "classes" */ '@/views/Classes.vue'),
  },
  {
    path: '/uploads',
    name: 'Upload de aulas',
    meta: {
      title: 'Dashboard',
      description: 'Ea amet veniam velit magna et magna adipisicing non. Ipsum duis fugiat eiusmod laboris enim dolore reprehenderit aliquip Lorem amet.'
    },
    component: () => import(/* webpackChunkName: "uploads" */ '@/views/Uploads.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
