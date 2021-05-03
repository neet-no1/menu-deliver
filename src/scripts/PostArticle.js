import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'
import CommonUtils from '../scripts/common_utils'
import Compressor from 'compressorjs'

import Quill from 'quill'
import ImageCompress from 'quill-image-compress';

export default {
    name: 'PostArticle',
    data() {
        return {
            // エディターインスタンス
            quill: null,

            // タイトル
            title: '',

            // サムネイル画像
            thumb_input_image: null,
            thumb_image_url: '',

            // 記事内容のパス
            contentsPath: null,

        }
    },
    methods: {
        get_items() {

            // エディターを生成
            this.create_editor()

            // 記事情報を取得する
            this.get_posted_articles()
        },
        get_posted_articles() {
            let articleId = this.$route.query.id

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
                            this.category = info.categoryId
                            this.thumb_image_url = info.imgPath
                            this.contentsPath = info.contents

                            // エディターに内容を表示
                            this.set_contents()
                        } else {
                            alert(response.errorInfo.errorMessage)
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

            Quill.register('modules/imageCompress', ImageCompress);

            var toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean']                                         // remove formatting button
            ];

            var options = {
                // ログレベル
                // 'error'、'warn'、'log'、'info'
                debug: 'info',
                modules: {
                    //toolbar: toolbarOptions,
                    toolbar: '#toolbar',
                    imageCompress: {
                        quality: 0.7,
                        maxWidth: 200,
                        maxHeight: 200,
                        imageType: 'image/*',
                        //debug: true,
                    }
                },
                placeholder: '記事の内容',
                //readOnly: true,
                theme: 'snow'
            };

            this.quill = new Quill('#editor', options);
        },
        set_contents() {
            new ApiUtils().getAccess(
                this.contentsPath,
                {},
                (response) => {
                    this.quill.setContents(JSON.parse(response))
                }
            )
        },
        onThumbPicked(file) {
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
                            vc.thumb_image_url = fr.result
                        })

                        vc.thumb_input_image = result
                    },
                    error(err) {
                      console.log(err.message);
                    },
                }
                new Compressor(file, payload)
            } else {
                this.thumb_image_url = ''
            }
        },
        post_article(isOpen) {
            let articleId = this.$route.query.id

            if (articleId == undefined) {
                articleId = 0
            }

            let formData = new FormData()
            formData.append("id", articleId);
            formData.append("title", this.title);
            formData.append("thumb", this.thumb_input_image);
            formData.append("contents", JSON.stringify(this.quill.getContents()));
            formData.append("opened", isOpen);

            new ApiUtils().formDataAccess(
                URL.POST_ARTICLE,
                formData,
                (response) => {
                    if (response.code == 0) {
                        // 成功したら、トップページへ遷移する
                        this.$router.push('/')
                    } else {
                        alert(response.errorInfo.errorMessage)
                        console.log('記事投稿エラー')
                        console.log(response)
                    }
                }
            )
        },
        delete_article() {
            let articleId = this.$route.query.id

            if (articleId != undefined) {
                // 削除処理を行う
                new ApiUtils().postAccess(
                    URL.POST_ARTICLE_DELTE,
                    {
                        "id": articleId
                    },
                    (response) => {
                        if (response.code != 0) {
                            alert(response.errorInfo.errorMessage)
                            console.log('記事削除エラー')
                            console.log(response)
                        } else {
                            // 成功したら、トップページへ遷移する
                            this.$router.push('/')
                        }
                    }
                );
            } else {
                // 削除対象が存在しない場合は、1つ前に戻る
                window.history.back(-1);
                return false;
            }
        }
    },
    mounted() {
        new CommonUtils().isAuthToLogin()
        this.get_items()
    },
    beforeDestroy() {
    }
}