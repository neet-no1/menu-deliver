import Vue from 'vue'

import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'
import CommonUtils from '../scripts/common_utils'

import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'

export default {
    name: 'PostQuestion',
    components: {
        PageHeader,
        PageFooter
    },
    data() {
        return {
            // ユーザ名
            user_name: '',

            // ユーザアイコン
            user_icon: {},

            // 画像情報
            input_image: null,

            // 画像パス
            uploadImageUrl: '',

            // 質問内容
            contents: '',
        }
    },
    methods: {
        get_account() {
            new ApiUtils().getAccess(
                URL.GET_ACCOUNT_INFO,
                {},
                (response) => {
                    if (response.code == 0) {
                        this.user_name = response.info.name
                        this.user_icon = {
                            'background-image': 'url(' + response.info.imgPath + ')'
                        }
                    } else {
                        alert('エラーが発生しました。')
                        console.log('アカウント情報取得エラー')
                        console.log(response)
                    }
                }
            )
        },
        onImagePicked(file) {
            let i = this.menu_imgs_index
            if (file !== undefined && file !== null) {
                if (file.name.lastIndexOf('.') <= 0) {
                    return
                }
                const fr = new FileReader()
                fr.readAsDataURL(file)
                fr.addEventListener('load', () => {
                    this.uploadImageUrl = fr.result
                })
            } else {
                this.uploadImageUrl = ''
            }
        },
        post_question() {
            let formData = new FormData()
            formData.append("contents", this.contents)
            formData.append("file", this.input_image)

            new ApiUtils().formDataAccess(
                URL.POST_QUESTION,
                formData,
                (response) => {
                    if (response.code == 0) {
                        // 成功したら、質問一覧ページへ遷移する
                        window.location.href = '/question'
                    } else {
                        alert('エラーが発生しました。')
                        console.log('質問投稿エラー')
                        console.log(response)
                    }
                }
            )
        },
    },
    mounted() {
        new CommonUtils().isAuthToLogin()
        this.get_account()
    }
}