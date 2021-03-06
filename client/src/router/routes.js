
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'category/:categoryId', component: () => import('pages/Index.vue') },
      { path: 'product/:id', component: () => import('pages/Product.vue') },
      { path: 'cart', component: () => import('pages/Cart.vue') }
    ]
  },

  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/admin/Login.vue') },
      { path: 'product', component: () => import('pages/admin/Products.vue') },
      { path: 'product/:id', component: () => import('pages/admin/Product.vue') },
      { path: 'new/product', component: () => import('pages/admin/Product.vue') },
      { path: 'category', component: () => import('pages/admin/Categories.vue') },
      { path: 'purchase', component: () => import('pages/admin/Purchases.vue') }
    ]
  },

  {
    path: '/extension',
    component: () => import('layouts/ExtensionLayout.vue'),
    children: [
      { path: 'popup', component: () => import('pages/admin/PopupPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
