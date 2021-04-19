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
            visible_password: false,
            visible_password_confirm: false,
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
    computed: {
        visible_password_type: function () {
            return this.visible_password ? 'text' : 'password'
        },
        visible_password_confirm_type: function () {
            return this.visible_password_confirm ? 'text' : 'password'
        }
    },
}