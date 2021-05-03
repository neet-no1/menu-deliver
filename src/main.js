import './css/style.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import ApiMock from './scripts/mock/api_mock'
import vuetify from './scripts/plugins/vuetify'

require('@fortawesome/fontawesome-free/js/all');
require('jquery-mockjax')($, window);

if (process.env.ENABLE_MOCK) {
  console.log('mock true');
  new ApiMock().load();
}
const router = new VueRouter({
  routes
})

Vue.use(VueRouter)

const app = new Vue({
  el: '#app',
  vuetify: vuetify,
  router: router,
  data: {
    currentRoute: window.location.pathname,
  }
})
