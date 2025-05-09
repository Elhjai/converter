import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Converter from '../views/Converter.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/converter',
    name: 'Converter',
    component: Converter,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('userToken');

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else if (to.meta.requiresAuth) {
    try {
      // Validate token by calling protected endpoint
      await axios.get('http://localhost:3000/api/auth/protected', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      next();
    } catch (error) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('username');
      next('/login');
    }
  } else {
    next();
  }
});

export default router;