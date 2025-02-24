import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(
        /* webpackChunkName: "list-productcategories" */ 
        '@/pages/ListCategoriesAndProducts.vue'
    )
  },
  {
    path: '/products/category/:category',
    name: 'category',
    component: () => import(
        /* webpackChunkName: "category" */
        '@/pages/CategoryDetail.vue'
    )
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(
        /* webpackChunkName: "cart" */
        '@/pages/Cart.vue'
    )
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: () => import(
        /* webpackChunkName: "product-detail" */
        '@/pages/ProductDetail.vue'
    )
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import(
        /* webpackChunkName: "not-found" */
        '@/pages/NotFound.vue'
    )
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router