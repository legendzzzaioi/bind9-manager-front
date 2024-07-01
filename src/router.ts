import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Zones',
    component: () => import('./views/ZoneList.vue'),
    meta: {
      title: 'Zones',
    }
  },
  {
    path: '/config',
    name: 'Config',
    component: () => import('./views/Configs.vue'),
    meta: {
      title: 'Config',
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _, next) => {
  if (to.meta.title) {
      document.title = to.meta.title as string;
  }
  next();
});

export default router;
