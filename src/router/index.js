import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/water',
      name: 'water',
      component: () => import('../views/WaterView.vue'),
    },
    {
      path: '/water/:embassament',
      name: 'embassament',
      component: () => import('../views/EmbassamentView.vue'),
      props: route => ({ embassament:route.params.embassament }),
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: () => import('../views/CarritoView.vue'),
    },
  ],
})

export default router
