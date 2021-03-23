import Quill from 'quill'

import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'
import CommonUtils from '../scripts/common_utils'

import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'
import News from '../pages/module/News.vue'

export default {
    name: 'ViewArticle',
    components: {
        PageHeader,
        PageFooter,
        News
    },
    data() {
        return {
            // エディターインスタンス
            quill: null,

            // ユーザ情報のアイコン
            user_icon: {},

            // お気に入りボタンのフラグ
            // true: お気に入り済み
            is_favorite: false,

            // タイトル
            title: '',

            // 投稿ユーザID
            user_id: 0,

            // 投稿ユーザ名
            user_name: '',
        }
    },
    methods: {
        get_items() {
            // エディターを生成する
            this.create_editor()

            // 記事情報を取得する
            this.get_posted_articles()

            // お気に入り状態取得
            this.get_favorite_state()
        },
        get_posted_articles() {
            let param = new CommonUtils().getQueryParam()
            let articleId = param.id

            if (articleId != undefined) {
                new ApiUtils().getAccess(
                    URL.GET_ARTICLE,
                    {
                        'id': articleId
                    },
                    (response) => {
                        if (response.code == 0) {
                            let info = response.info
                            this.title = info.title
                            //this.category = info.categoryId
                            //this.thumb_image_url = info.imgPath
                            this.contentsPath = info.contents
                            this.user_icon = {
                                'background-image': 'url(' + info.userIconPath + ')'
                            }
                            this.user_name = info.userName
                            this.user_id = info.userId

                            // エディターに内容を表示
                            this.set_contents()
                        } else {
                            alert('エラーが発生しました。')
                            console.log('記事内容取得エラー')
                            console.log(response)
                        }
                    }
                );
            }
        },
        create_editor() {
            let Font = Quill.import('formats/font')
            Font.whitelist = ['ms-mincho', 'meiryo', 'ms-gothic', 'yu-gothic'];
            Quill.register(Font, true);

            var options = {
                // ログレベル
                // 'error'、'warn'、'log'、'info'
                debug: 'info',
                placeholder: '記事の内容',
                modules: {
                    //toolbar: toolbarOptions,
                    toolbar: '#toolbar',
                },
                readOnly: true,
                theme: 'snow'
            };

            this.quill = new Quill('#editor', options);
        },
        set_contents() {
            new ApiUtils().getAccess(
                this.contentsPath,
                {},
                (response) => {
                    this.quill.setContents(response)
                }
            )
        },
        add_favorite() {
            new CommonUtils().isAuthToLogin()
            this.is_favorite = !this.is_favorite

            let param = new CommonUtils().getQueryParam()
            let articleId = param.id

            if (articleId != undefined) {
                new ApiUtils().postAccess(
                    URL.POST_ARTICLE_FAVORITE,
                    {
                        "id": articleId,
                        "added": this.is_favorite
                    },
                    (response) => {
                        if (response.code == 0) {
                            // 成功時は何もしない
                        } else {
                            alert('エラーが発生しました。')
                            console.log('お気に入り追加・解除エラー')
                            console.log(response)
                        }
                    }
                );
            }
        },
        add_follow() {
            new CommonUtils().isAuthToLogin()
            new ApiUtils().postAccess(
                URL.POST_FOLLOW,
                {
                    "userId": this.user_id
                },
                (response) => {
                    if (response.code == 0) {
                        // 成功時は何もしない
                    } else {
                        alert('エラーが発生しました。')
                        console.log('フォローエラー')
                        console.log(response)
                    }
                }
            )
        },
        get_favorite_state() {
            let param = new CommonUtils().getQueryParam()
            let articleId = param.id

            if (articleId != undefined) {
                new ApiUtils().getAccess(
                    URL.GET_FAVORITE_ARTICLE_ITEM,
                    {
                        id: articleId
                    },
                    (response) => {
                        if (response.code == 0) {
                            this.is_favorite = response.info
                        } else {
                            alert('エラーが発生しました。')
                            console.log('記事のお気に入り追加状態を取得エラー')
                            console.log(response)
                        }
                    }
                )
            }
        }
    },
    mounted() {
        this.get_items()
    },
    beforeDestroy() {
    }
}