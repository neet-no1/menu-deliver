import Vue from 'vue'
import Compressor from 'compressorjs'

import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'
import CommonUtils from '../scripts/common_utils'

import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'
import News from '../pages/module/News.vue'

export default {
    name: 'QueistionDetail',
    components: {
        PageHeader,
        PageFooter,
        News
    },
    data() {
        return {

            // 質問内容
            contents: '',

            // 質問投稿ユーザ名
            user_name: '',

            // 質問投稿ユーザアイコン
            user_icon: {},

            // 質問画像パス
            question_img_url: '',

            // 回答画像
            input_image: null,
            uploadImageUrl: '',

            // ベストアンサー
            best_answer: {},
            best_answer_contents: {},

            // 質問が自分のものかどうか
            mine: false,

            // 回答一覧
            answers: [],

            // 現在のユーザが認証済みかどうか
            is_auth: false,

            // 回答ユーザ名
            answer_user_name: '',

            // 回答ユーザアイコン
            answer_user_icon: '',

            // 回答内容
            answer_contents: '',
        }
    },
    methods: {
        get_items() {
            // ベストアンサーを取得する
            this.get_best_answer()

            // 質問内容を取得する
            this.get_question()

            // 認証済みユーザか確認する
            this.get_is_auth()
        },
        get_question() {
            let questionId = this.$route.query.id

            if (questionId != undefined) {
                new ApiUtils().getAccess(
                    URL.GET_QUESTION,
                    {
                        'id': questionId
                    },
                    (response) => {
                        if (response.code == 0) {
                            let info = response.info

                            this.user_name = info.userName
                            this.contents = info.contents
                            this.user_icon = {
                                'background-image': 'url(' + info.userIcon + ')'
                            }
                            this.question_img_url = info.images

                            this.mine = info.mine
                        } else {
                            alert(response.errorInfo.errorMessage)
                            console.log('質問内容取得エラー')
                            console.log(response)
                        }
                    }
                );
            }
        },
        get_best_answer() {
            let questionId = this.$route.query.id

            if (questionId != undefined) {
                new ApiUtils().getAccess(
                    URL.GET_QUESTION_BESTANSWER,
                    {
                        "id": questionId
                    },
                    (response) => {
                        if (response.code == 0) {
                            this.best_answer = response.info

                            // 回答一覧を取得する
                            this.get_answers()
                        } else {
                            alert(response.errorInfo.errorMessage)
                            console.log('ベストアンサー取得エラー')
                            console.log(response)
                        }
                    }
                );
            }
        },
        get_answers() {
            let questionId = this.$route.query.id

            if (questionId != undefined) {
                new ApiUtils().getAccess(
                    URL.GET_QUESTION_ANSWERS,
                    {
                        "id": questionId
                    },
                    (response) => {
                        if (response.code == 0) {
                            if (this.best_answer.exist) {
                                this.answers = response.info.answers.map((e) => {
                                    return {
                                        id: e.id,
                                        user_name: e.userName,
                                        user_icon: {
                                            'background-image': 'url(' + e.userIcon + ')'
                                        },
                                        contents: e.contents,
                                        img: e.images
                                    }
                                }).filter(e => this.best_answer.id != e.id)
                                this.best_answer_contents = response.info.answers.map((e) => {
                                    return {
                                        id: e.id,
                                        user_name: e.userName,
                                        user_icon: {
                                            'background-image': 'url(' + e.userIcon + ')'
                                        },
                                        contents: e.contents,
                                        img: e.images
                                    }
                                }).filter(e => this.best_answer.id == e.id)[0]
                            } else {
                                this.answers = response.info.answers.map((e) => {
                                    return {
                                        id: e.id,
                                        user_name: e.userName,
                                        user_icon: {
                                            'background-image': 'url(' + e.userIcon + ')'
                                        },
                                        contents: e.contents,
                                        img: e.images
                                    }
                                })
                            }
                        } else {
                            alert(response.errorInfo.errorMessage)
                            console.log('回答一覧取得エラー')
                            console.log(response)
                        }
                    }
                );
            }
        },
        decide_best_answer(answer) {
            let questionId = this.$route.query.id

            if (questionId != undefined) {
                new ApiUtils().postAccess(
                    URL.POST_QUESTION_BESTANSWER,
                    {
                        "questionId": questionId,
                        "answerId": answer.id
                    },
                    (response) => {
                        if (response.code == 0) {
                            // 成功したら、再度ページを開きなおす
                            this.$router.push('/question/detail?id=' + questionId)
                        } else {
                            alert(response.errorInfo.errorMessage)
                            console.log('ベストアンサー決定エラー')
                            console.log(response)
                        }
                    }
                );
            }
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
        get_is_auth() {
            new ApiUtils().getAccess(
                URL.GET_ACCOUNT_AUTH,
                {},
                (response) => {
                    if (response.code == 0) {
                        if (response.info) {
                            this.is_auth = true

                            // ユーザ情報を取得する
                            this.get_account()
                        } else {
                            this.is_auth = false
                        }
                    } else {
                        console.log('認証状態取得に失敗しました。')
                        this.is_auth = false
                    }
                }
            )
        },
        get_account() {
            new ApiUtils().getAccess(
                URL.GET_ACCOUNT_INFO,
                {},
                (response) => {
                    if (response.code == 0) {
                        this.answer_user_name = response.info.name
                        this.answer_user_icon = {
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
        post_answer() {
            let questionId = this.$route.query.id
            
            if (questionId != undefined) {

                let formData = new FormData()
                formData.append("id", questionId)
                formData.append("contents", this.answer_contents)
                formData.append("file", this.input_image)

                new ApiUtils().formDataAccess(
                    URL.POST_QUESTION_ANSWER,
                    formData,
                    (response) => {
                        if (response.code == 0) {
                            // 成功したら、再度ページを開きなおす
                            this.$router.push('/question/detail?id=' + questionId)
                        } else {
                            alert(response.errorInfo.errorMessage)
                            console.log('回答投稿エラー')
                            console.log(response)
                        }
                    }
                );
            }
        },
    },
    mounted() {
        this.get_items()
    }
}