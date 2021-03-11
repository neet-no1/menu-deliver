import Vue from 'vue'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image'
import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'
import axios from 'axios'

export default {
    name: 'PostArticle',
    data() {
        return {
            editor: null,
            updateCurrentInput: null
        }
    },
    methods: {
        create_editor() {
            const editor = new EditorJS({
                // editorJSを描画する対象のID
                holder: 'editorjs',

                // 過去データはdataに設定
                //data: {"time":1615455111734,"blocks":[{"type":"image","data":{"file":{"url":"https://app.neet-professional.work/public/img/menu_no_image.jpg"},"caption":"サンプル","withBorder":false,"stretched":false,"withBackground":false}}],"version":"2.19.1"},
                data: {},

                // editorJSが準備できたら実行する関数
                // (非同期で初期化が行われるため)
                onReady: () => {
                    console.log('Editor.js is ready to work!')
                },

                // editorの内容が変更されたときに呼び出す関数
                onChange: () => {
                    console.log('内容変更')
                },

                // 
                onMouseOver: () => {},

                // 初期化後にオートフォーカス
                //autofocus: true,

                // プレースホルダー
                placeholder: '記事の内容',

                // ログレベル
                // VERBOSE > INFO > WARN > ERROR
                // 本番はERROR、デフォルトはVERBOSE
                //logLevel: 'ERROR',

                // read-onlyモード
                // 閲覧ページで使えるかも？
                //readOnly: true,

                // 共通のインラインツールバーの順序を指定
                // tools の inlineToolbar で上書きできる
                inlineToolbar: ['link', 'bold', 'italic'],

                tools: {
                    header: {
                        class: Header
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            /**
                             * Custom uploader
                             */
                            uploader: {
                                /**
                                 * Upload file to the server and return an uploaded image data
                                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                                 * @return {Promise.<{success, file: {url}}>}
                                 */
                                uploadByFile(file) {
                                    console.log('file: ' + file)

                                    let formData = new FormData();
                                    formData.append("image", file);
                                    return new Promise((resolve) => {
                                        resolve(
                                            $.ajax({
                                                url: URL.POST_UPLOAD_IMAGE,
                                                type: 'post',
                                                cache: false,
                                                processData: false,
                                                contentType: 'multipart/form-data',
                                                data: formData
                                            }).done(function (res) {
                                                return res
                                            })
                                        );
                                    });
                                    // return axios
                                    //     .post(URL.POST_UPLOAD_IMAGE, formData, {
                                    //         headers: { "content-type": "multipart/form-data" },
                                    //     })
                                    //     .then((res) => {
                                    //         return res.data;
                                    //     });

                                    // return $.ajax({
                                    //     url: URL.POST_UPLOAD_IMAGE,
                                    //     type: 'post',
                                    //     cache: false,
                                    //     processData: false,
                                    //     contentType: false,
                                    //     //dataType: 'blob',
                                    //     data: file
                                    // })
                                    //     .done(function (response) {
                                    //         // TODO 通信成功時
                                    //         // 何を見て何をレスポンスとして返すかを設計する
                                    //         callback(response);
                                    //     })
                                    //     .fail(function (xht) {
                                    //         // TODO 通信失敗時
                                    //         // 何を見て何をレスポンスとして返すかを設計する
                                    //         callback(xht);
                                    //     })

                                    // your own uploading logic here
                                    // return new ApiUtils().postAccess(URL.POST_UPLOAD_IMAGE, {}, (response) => {
                                    //     console.log('uploadByFile')
                                    //     return response
                                    // });
                                    // your own uploading logic here
                                    // return MyAjax.upload(file).then(() => {
                                    //     return {
                                    //         success: 1,
                                    //         file: {
                                    //             url: 'https://codex.so/upload/redactor_images/o_80beea670e49f04931ce9e3b2122ac70.jpg',
                                    //             // any other image data you want to store, such as width, height, color, extension, etc
                                    //         }
                                    //     };
                                    // });
                                },

                                /**
                                 * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
                                 * @param {string} url - pasted image URL
                                 * @return {Promise.<{success, file: {url}}>}
                                 */
                                uploadByUrl(url) {
                                    console.log('uploadByUrl');
                                    console.log('url: ' + url)

                                    return new Promise((resolve) => {
                                        resolve({ success: 1, file: { url: url } });
                                    });

                                    // return $.ajax({
                                    //     url: URL.GET_UPLOADED_IMAGE,
                                    //     type: 'get',
                                    //     cache: false,
                                    //     dataType: 'json',
                                    //     data: {}
                                    // })
                                    //     .done(function (response) {
                                    //         // TODO 通信成功時
                                    //         // 何を見て何をレスポンスとして返すかを設計する
                                    //         callback(response);
                                    //     })
                                    //     .fail(function (xht) {
                                    //         // TODO 通信失敗時
                                    //         // 何を見て何をレスポンスとして返すかを設計する
                                    //         callback(xht);
                                    //     })
                                    // your own uploading logic here
                                    // return new ApiUtils().getAccess(URL.GET_UPLOADED_IMAGE, {}, (response) => {
                                    //     console.log('uploadByUrl')
                                    //     return response
                                    // });
                                    // your ajax request for uploading
                                    // return MyAjax.upload(file).then(() => {
                                    //     return {
                                    //         success: 1,
                                    //         file: {
                                    //             url: 'https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg',
                                    //             // any other image data you want to store, such as width, height, color, extension, etc
                                    //         }
                                    //     }
                                    // })
                                }
                            }
                        }
                    },
                    // image: {
                    //     class: SimpleImage,
                    // }
                    // header: {
                    //     class: Header,
                    //     /**
                    //      * This property will override the common settings
                    //      * That means that this tool will have only Marker and Link inline tools
                    //      * If 'true', the common settings will be used.
                    //      * If 'false' or omitted, the Inline Toolbar wont be shown
                    //      */
                    //     inlineToolbar: ['marker', 'link'],
                    //     config: {
                    //         placeholder: 'Header'
                    //     },
                    //     shortcut: 'CMD+SHIFT+H'
                    // },
                },
            });

            // 正常に初期化されたか確認
            editor.isReady
                .then(() => {
                    console.log('editor 正常動作')

                    // read-onlyモードを切り替える
                    // editor.readOnly.toggle();

                    // dataにeditorを設定
                    this.editor = editor
                })
                .catch((reason) => {
                    console.log(`editor エラー ${reason}`)
                });
        },
        save() {
            // editorの保存処理
            // save()の後にサーバーへデータを送信する
            this.editor.save().then((outputData) => {
                console.log('Article data: ', outputData)
            }).catch((error) => {
                console.log('Saving failed: ', error)
            });
        }
    },
    mounted() {
        this.create_editor()
    },
    beforeDestroy() {
        this.editor.destroy()
    }
}