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
    name: 'Classes',
    meta: {
      title: 'Aulas',
      description: 'Ea amet veniam velit magna et magna adipisicing non. Ipsum duis fugiat eiusmod laboris enim dolore reprehenderit aliquip Lorem amet.'
    },
    component: () => import(/* webpackChunkName: "class" */ '@/views/Class.vue'),
  },
  {
    path: '/uploads',
    name: 'Uploads',
    meta: {
      title: 'Upload de aulas',
      description: 'Ea amet veniam velit magna et magna adipisicing non. Ipsum duis fugiat eiusmod laboris enim dolore reprehenderit aliquip Lorem amet.'
    },
    component: () => import(/* webpackChunkName: "upload" */ '@/views/Upload.vue'),
    children: [
      {
        name: 'UploadVideo',
        path: 'video',
        component: () => import(/* webpackChunkName: "upload-video" */ '@/views/UploadVideo.vue'),
      },
      {
        name: 'UploadAudio',
        path: 'audio',
        component: () => import(/* webpackChunkName: "upload-audio" */ '@/views/UploadAudio.vue'),
      },
      {
        name: 'UploadPDF',
        path: 'pdf',
        component: () => import(/* webpackChunkName: "upload-pdf" */ '@/views/UploadPDF.vue'),
      },
      {
        name: 'UploadText',
        path: 'text',
        component: () => import(/* webpackChunkName: "upload-text" */ '@/views/UploadText.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
