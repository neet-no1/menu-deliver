import Quill from 'quill'
import ImageCompress from 'quill-image-compress';

export default {
    name: 'PostArticle',
    data() {
        return {
            quill: null
        }
    },
    methods: {
        create_editor() {
            let Font = Quill.import('formats/font')
            Font.whitelist = ['ms-mincho', 'meiryo', 'ms-gothic', 'arial'];
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
                        maxHeight: 300,
                        imageType: 'image/*',
                        debug: true,
                    }
                },
                placeholder: 'Compose an epic...',
                //readOnly: true,
                theme: 'snow'
            };

            this.quill = new Quill('#editor', options);

            this.quill.setContents([{ "insert": "サンプル\nテキスト\n" }, { "attributes": { "font": "meiryo" }, "insert": "あああメイリオ" }, { "insert": "\n" }, { "attributes": { "font": "ms-mincho" }, "insert": "同じじゃない" }, { "insert": "\n" }, { "attributes": { "font": "ms-gothic" }, "insert": "違う？" }, { "insert": "\n\n" }, { "attributes": { "font": "ms-gothic" }, "insert": "画像" }, { "insert": "\n" }, { "insert": "\n" }])
        },
        save() {
            console.log('save()')
            console.log(this.quill.getContents())
        }
    },
    mounted() {
        this.create_editor()
    },
    beforeDestroy() {
    }
}