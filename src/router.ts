import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/Zone',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/Login.vue'),
    meta: {
      title: 'Login',
    }
  },
  {
    path: '/zone',
    name: 'Zone',
    component: () => import('./views/Zone.vue'),
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
  {
    path: '/log',
    name: 'Log',
    component: () => import('./views/Log.vue'),
    meta: {
      title: 'Log',
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('./views/User.vue'),
    meta: {
      title: 'User',
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.title) {
      document.title = to.meta.title as string;
  }
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  }
  next();
});

export default router;
