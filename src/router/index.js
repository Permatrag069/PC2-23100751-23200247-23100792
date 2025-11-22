import { createRouter, createWebHistory } from 'vue-router'
import LoginLayout from '../layouts/LoginLayout.vue'
import MainLayout from '../layouts/MainLayout.vue'
import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'

const routes = [
  {
    path: '/',
    component: LoginLayout,
    children: [
      { path: '', component: LoginPage }
    ]
  },
  {
    path: '/dashboard',
    component: MainLayout,
    children: [
      { path: '', component: DashboardPage }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
