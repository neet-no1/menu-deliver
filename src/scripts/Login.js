import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'

export default {
    data() {
        return {
            // 入力パラメタ
            email: '',
            password: '',
            visible_password: false,
        }
    },
    methods: {
        /**
         * ログイン処理
         */
        api_login: function(event) {
            let formData = new FormData()
            formData.append("email", this.email);
            formData.append("password", this.password);

            new ApiUtils().formDataAccess(
                URL.POST_LOGIN,
                formData,
                (response) => {
                if(response.code == 0) {
                    // トップページへ遷移
                    window.location.href = '/';
                } else {
                    alert(response.errorInfo.errorMessage)
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
                            //window.location.href = '/';
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
    computed: {
        visible_password_type: function () {
            return this.visible_password ? 'text' : 'password'
        },
    },
    mounted() {
        this.is_auth()
    },
}