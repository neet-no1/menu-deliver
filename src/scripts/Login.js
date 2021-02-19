import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'

export default {
    data() {
        return {login: null}
    },
    methods: {
        api_login: function(event) {
            console.log('login URL:' + URL.POST_LOGIN);
            let response = new ApiUtils().postAccess(URL.POST_LOGIN, {'user_id': 'user', 'user_password': 'password'}, (response) => {
                // ???X?|???X??g???????L?????B
                console.log('response: ');
                console.log(response);
            });
        },
        api_test: function(event) {
            console.log('???i?? URL:' + URL.GET_NEW_ARRIVAL_PRODUCTS);
            let response = new ApiUtils().getAccess(URL.GET_NEW_ARRIVAL_PRODUCTS, {}, (response) => {
                // ???X?|???X??g???????L?????B
                console.log('response: ');
                console.log(response);
            });
        }
    },
    props: {
        attrs: [
            {
                key: 'today',
                highlight: {
                  backgroundColor: '#ff8080',
                },
                dates: new Date()
            }
        ]
    },

}