import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AuthorizeAutzorgView from '../views/AuthorizeAutzorgView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/authorize_autzorg',
      name: 'AuthorizeAutzorg',
      component: AuthorizeAutzorgView,
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
    }
  ],
})

router.beforeResolve(async (to, from, next) => {
  const auth = useAuthStore()
  if (auth.isLoading) {
    await auth.loginByToken()
    if (auth.isLogin) {
      next('/home')
    }
  }
  if (to.meta.requireAuth && !auth.isLogin) {
    next('/')
  } else {
    next()
  }
})


export default router
