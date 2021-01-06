import BootstrapVue, { IconsPlugin } from 'bootstrap-vue'
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueGraph from 'vue-graph';

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueGraph)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
