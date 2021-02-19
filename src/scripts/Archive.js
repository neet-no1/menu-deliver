import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'
import Vue from 'vue'
import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'

export default {
    name: 'Archive',
    components: {
        PageHeader,
        PageFooter
    },
    data() {
        return {
            products_list: new ApiUtils().getAccess(URL.GET_NEW_ARRIVAL_PRODUCTS, {}, (response) => {
                this.products_list = response.info.productList;
            })
        }
    }
}