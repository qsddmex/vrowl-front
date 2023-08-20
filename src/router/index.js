// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/uploads'
  },
  {
    path: '/classes',
    name: 'Class',
    meta: {
      title: 'Aulas',
      description: 'Ea amet veniam velit magna et magna adipisicing non. Ipsum duis fugiat eiusmod laboris enim dolore reprehenderit aliquip Lorem amet.'
    },
    component: () => import(/* webpackChunkName: "class" */ '@/views/Class.vue'),
  },
  {
    name: 'ClassDetail',
    path: '/classes/:id',
    component: () => import(/* webpackChunkName: "class" */ '@/views/ClassDetail.vue'),
  },
  {
    path: '/uploads',
    name: 'Uploads',
    meta: {
      title: 'Upload de aulas',
      description: 'Ea amet veniam velit magna et magna adipisicing non. Ipsum duis fugiat eiusmod laboris enim dolore reprehenderit aliquip Lorem amet.'
    },
    component: () => import(/* webpackChunkName: "upload" */ '@/views/Upload.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
