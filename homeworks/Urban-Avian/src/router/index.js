import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CitiesView from '@/views/CitiesView.vue'
import CityView from '@/views/CityView.vue'
import SpotView from '@/views/SpotView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', //首頁固定長相
      component: HomeView,
    },
    {
      path: '/cities', //定義路徑名稱
      component: CitiesView, //使用檔案
    },
    {
      path: '/cities/:city', //定義路徑名稱
      name: 'City',
      component: CityView, //使用檔案
    },
    {
      path: '/cities/:city/spots/:id',
      component: SpotView,
    }
  ],
})

export default router
