import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        api_login: function(event) {
            new ApiUtils().postAccess(URL.POST_LOGIN,
                {
                    'email': this.email,
                    'password': this.password
                },
                (response) => {
                if(response.code == 0) {
                    // トップページへ遷移
                    window.location.href = '/';
                } else {
                    alert('認証に失敗しました。再度お試しください。')
                }
            });
        }
    }
}