import './css/style.scss'
import Vue from 'vue'
import routes from './routes'
import VCalendar from 'v-calendar'
import ApiMock from './scripts/mock/api_mock'

require('jquery-mockjax')($, window);

if(ENABLE_MOCK) {
  console.log('mock true');
  new ApiMock().load();
} else {
  console.log('mock false');
}

Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      return matchingView
        ? require('./pages/' + matchingView + '.vue')
        : require('./pages/404.vue')
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})


window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
