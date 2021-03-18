import './css/style.scss'
import Vue from 'vue'
import routes from './routes'
import ApiMock from './scripts/mock/api_mock'
import vuetify from './scripts/plugins/vuetify'

require('@fortawesome/fontawesome-free/js/all');
require('jquery-mockjax')($, window);

if (ENABLE_MOCK) {
  console.log('mock true');
  new ApiMock().load();
}

function initializeApp() {

  const app = new Vue({
    el: '#app',
    vuetify: vuetify,
    data: {
      currentRoute: window.location.pathname,
      isLogin: false
    },
    computed: {
      ViewComponent() {
        const matchingView = routes[this.currentRoute]
        return matchingView
          ? require('./pages/' + matchingView + '.vue')
          : require('./pages/404.vue')
      }
    },
    render(h) {
      return h(this.ViewComponent)
    }
  })
}


window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})

initializeApp();
