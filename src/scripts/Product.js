import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'
import Vue from 'vue'
import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'
import ProductContainer from '../pages/module/ProductContainer.vue'

export default {
    name: 'Product',
    components: {
        PageHeader,
        PageFooter,
        ProductContainer
    },
    data() {
        return {
            product: {},
            other_list: new ApiUtils().getAccess(URL.GET_NEW_ARRIVAL_PRODUCTS, {}, (response) => {
                this.other_list = response.info.productList;
            }),
            category_product_list: new ApiUtils().getAccess(URL.GET_NEW_ARRIVAL_PRODUCTS, {}, (response) => {
                this.category_product_list = response.info.productList;
            })
        }
    }
}