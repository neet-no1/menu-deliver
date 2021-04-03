import Vue from 'vue'

import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'

export default {
    name: 'PasswordReset',
    data() {
        return {
            email: ''
        }
    },
    methods: {
        password_reset() {
            new ApiUtils().postAccess(
                URL.POST_PASSWORD_RESET,
                {
                    "email": this.email
                },
                (response) => {
                    if (response.code == 0) {
                        // パスワードリセットが完了したらログイン画面へ遷移する
                        window.location.href = '/login';
                    } else {
                        alert(response.errorInfo.errorMessage)
                        console.log('パスワードリセットエラー')
                        console.log(response)
                    }
                }
            )
        }
    },
}