import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'

export default {
    data() {
        return {
            // 入力パラメタ
            email: '',
            password: ''
        }
    },
    methods: {
        /**
         * ログイン処理
         */
        api_login: function(event) {
            new ApiUtils().postAccess(
                URL.POST_LOGIN,
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
        },
        /**
         * ログイン状態取得
         */
        is_auth: function() {
            new ApiUtils().getAccess(
                URL.GET_ACCOUNT_AUTH,
                {},
                (response) => {
                    if(response.code == 0) {
                        if(response.info) {
                            // 認証済みであればトップページへ遷移
                            window.location.href = '/';
                        } else {
                            // 認証されていなければ何もしない
                        }
                    } else {
                        console.log('認証状態取得に失敗しました。')
                    }
                }
            )
        }
    },
    mounted() {
        this.is_auth()
    },
}