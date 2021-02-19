import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'
import Vue from 'vue'
import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'
//import ProductContainer from '../pages/module/ProductContainer.vue'
import News from '../pages/module/News.vue'
import Navigation from '../pages/module/Navigation.vue'

export default {
  name: 'Top',
  components: {
    PageHeader,
    PageFooter,
    //ProductContainer,
    News,
    Navigation
  },
  data() {
    return {
      new_products: new ApiUtils().getAccess(URL.GET_NEW_ARRIVAL_PRODUCTS, {}, (response) => {
        this.new_products = response.info.productList;
      }),
      hot_products: new ApiUtils().getAccess(URL.GET_NEW_ARRIVAL_PRODUCTS, {}, (response) => {
        this.hot_products = response.info.productList;
      })

    }
  }
}