import Quill from 'quill'

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
            quill: null,
            user_icon: {
                'background-image': 'url("/public/img/user_1.jpg")'
            },
            is_favorite: false,
        }
    },
    methods: {
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

            this.quill.setContents([{ "insert": "サンプル\nテキスト\n" }, { "attributes": { "font": "meiryo" }, "insert": "あああメイリオ" }, { "insert": "\n" }, { "attributes": { "font": "ms-mincho" }, "insert": "同じじゃない" }, { "insert": "\n" }, { "attributes": { "font": "ms-gothic" }, "insert": "違う？" }, { "insert": "\n\n" }, { "attributes": { "font": "ms-gothic" }, "insert": "画像" }, { "insert": "\n" }, { "insert": "\n" }])
        },
        save() {
            console.log('save()')
            console.log(this.quill.getContents())
        },
        add_favorite() {
            this.is_favorite = !this.is_favorite
        }
    },
    mounted() {
        this.create_editor()
    },
    beforeDestroy() {
    }
}