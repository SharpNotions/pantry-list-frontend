import Vue from 'vue'
import Router from 'vue-router'
import AuthedView from '@/components/AuthedView'
import Login from '@/components/Login'
import ItemRanking from '@/components/ItemRanking'
import TotalRankings from '@/components/TotalRankings'
import auth from '@/auth'
import http from '@/api/http'

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
      path: '/',
      name: 'AuthedView',
      component: AuthedView,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/list/:list',
          redirect: '/list/:list/my-rankings'
        },
        {
          path: '/list',
          redirect: `/list/${DEFAULT_LIST}/my-rankings`
        },
        {
          path: '/',
          redirect: `/list/${DEFAULT_LIST}/my-rankings`
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
        }
      ]
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

http.addResponseInterceptor((url, options, response) => {
  if (response.status === 401) {
    auth.unauthorize()
    router.push('Login')
  }
  return response
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.isAuthorized()) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
