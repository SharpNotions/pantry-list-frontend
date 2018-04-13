import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import ItemRanking from '@/components/ItemRanking'
import TotalRankings from '@/components/TotalRankings'
import auth from '@/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'ItemRanking',
      component: ItemRanking,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/total-rankings',
      name: 'TotalRankings',
      component: TotalRankings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.isAuthorized()) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
