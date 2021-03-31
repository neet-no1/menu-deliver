import Vue from 'vue'
import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'

export default {
    name: 'PageHeader',
    data() {
        return {
            // モーダルを開く
            select_post_type: false,

            // ログインしているか
            isLogin: false,

            // ユーザアイコン
            user_icon: '',
        }
    },
    methods: {
        get_is_auth() {
            new ApiUtils().getAccess(
                URL.GET_ACCOUNT_AUTH,
                {},
                (response) => {
                    if (response.code == 0) {
                        this.isLogin = response.info

                        // ログインしていたら、アカウント情報取得
                        if (this.isLogin) {
                            this.get_account_info()
                        }
                    } else {
                        alert('エラーが発生しました。')
                        console.log('ログイン状態取得エラー')
                        console.log(response)
                    }
                }
            )
        },
        get_account_info() {
            new ApiUtils().getAccess(
                URL.GET_ACCOUNT_INFO,
                {},
                (response) => {
                    if (response.code == 0) {
                        this.user_icon = response.info.imgPath
                    } else {
                        alert('エラーが発生しました。')
                        console.log('アカウント情報取得エラー')
                        console.log(response)
                    }
                }
            )
        },
        post_menu_or_article: function () {
            this.select_post_type = this.select_post_type == false
        },
        close_modal: function () {
            this.select_post_type = false
        },
        close_modal_cancel: function (event) {
            if (event) {
                event.preventDefault()
                event.stopPropagation()
            }
        }
    },
    mounted() {
        this.get_is_auth()
    }
}