import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import ItemRanking from '@/components/ItemRanking'
import TotalRankings from '@/components/TotalRankings'
import Lists from '@/components/Lists'
import auth from '@/auth'

Vue.use(Router)

export const DEFAULT_LIST = 'default'

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/list/:list/my-rankings',
      name: 'ItemRanking',
      component: ItemRanking,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/list/:list/total-rankings',
      name: 'TotalRankings',
      component: TotalRankings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/list/:list',
      redirect: '/list/:list/my-rankings'
    },
    {
      path: '/lists',
      component: Lists
    },
    {
      path: '/list',
      redirect: `/list/${DEFAULT_LIST}/my-rankings`
    },
    {
      path: '/',
      redirect: `/list/${DEFAULT_LIST}/my-rankings`
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
