import Vue from 'vue'

import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'

export default {
    name: 'CreateAccount',
    data() {
        return {
            email: '',
            password: '',
            password_confirm: '',
        }
    },
    methods: {
        create_account() {
            new ApiUtils().postAccess(
                URL.POST_ACCOUNT_REGIST,
                {
                    "email": this.email,
                    "password": this.password,
                    "passwordConfirm": this.password_confirm
                },
                (response) => {
                    if (response.code == 0) {
                        // アカウント登録が完了したら、仮完了画面へ遷移
                        window.location.href = '/create/account/predone';
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