import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FormView from '@/views/FormView.vue';
import AutoSortingView from '@/views/AutoSortingView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/form',
      name: 'form',
      component: FormView,
    },
    {
      path: '/auto-sorting',
      name: 'auto-sorting',
      component: () => AutoSortingView,
    },
  ],
});

export default router;
