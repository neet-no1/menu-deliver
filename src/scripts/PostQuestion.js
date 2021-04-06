import Vue from 'vue'
import Compressor from 'compressorjs'

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
                        alert(response.errorInfo.errorMessage)
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

                let vc = this
                let payload = {
                    quality: 0.6,
                    maxWidth: 350,
                    maxHeight: 220,
                    success(result) {
                        const fr = new FileReader()
                        fr.readAsDataURL(result)
                        fr.addEventListener('load', () => {
                            vc.uploadImageUrl = fr.result
                        })

                        vc.input_image = result
                    },
                    error(err) {
                      console.log(err.message);
                    },
                }
                new Compressor(file, payload)
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
                        alert(response.errorInfo.errorMessage)
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