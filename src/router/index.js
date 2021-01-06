import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CovidDataView from '../views/CovidDataView.vue'
import ErrorPage from '../common/components/ErrorPage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/covid-data',
    name: 'CovidData',
    component: CovidDataView
  },
  {
    path: '*',
    component: ErrorPage
  }
]

const router = new VueRouter({
  routes
})

export default router
