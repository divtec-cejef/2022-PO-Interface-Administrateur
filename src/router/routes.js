import RegisterPage from 'pages/RegisterPage'
import DatasPage from "pages/DatasPage";

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
  {
    path: '/register',
    name: 'regiser',
    component: RegisterPage
  },
  {
    path: '/data',
    name: 'data',
    component: DatasPage
  }
]

export default routes
