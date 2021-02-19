import Vue from 'vue'
import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue'),
    redirect: '/homeContent',
    children: [
      {
        path: '/homeContent',
        component: () => import('../views/body/homeContent.vue')

      },

      {
        path: '/recommend',
        component: () => import('../views/body/recommend.vue'),
        redirect: '/recommend/recommendList',
        children: [
          {
            path: 'recommendList',
            component: () => import('../views/body/components/recommendList.vue'),

          },
          {
            path: 'itemDetail',
            component: () => import('../views/body/components/itemDetail.vue')
          },
        ]
      },
      {
        path: '/allProduct',
        component: () => import('../views/body/allProduct.vue'),
        redirect: '/allProduct/allProductList',
        children: [
          {
            path: 'allProductList',
            component: () => import('../views/body/components/allProductList.vue'),

          },
          {
            path: 'itemDetail',
            component: () => import('../views/body/components/itemDetail.vue')
          },
        ]
      },
      {
        path: '/shoppingCar',
        component: () => import('../views/body/shoppingCar.vue')

      },
      {
        path: '/searchResult',
        component: () => import('../views/body/searchResult.vue')

      },
      {
        path: '/userCenter',
        component: () => import('../views/body/userCenter.vue'),
        redirect: '/userCenter/userInfo',
        children: [
          {
            path: 'userInfo',
            component: () => import('../views/body/components/userInfo.vue')
          },
          {
            path: 'changePassword',
            component: () => import('../views/body/components/changePassword.vue')
          },
          {
            path: 'myCount',
            component: () => import('../views/body/components/myCount.vue')
          }, {
            path: 'address',
            component: () => import('../views/body/components/address.vue')
          }
        ]

      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
