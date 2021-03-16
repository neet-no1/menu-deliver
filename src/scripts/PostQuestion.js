import Vue from 'vue'

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
            quill: null,
            user_icon: {
                'background-image': 'url("/public/img/user_1.jpg")'
            },
            menu_imgs_index: 0,
            menu_imgs: [
                {
                    input_image: null,
                    uploadImageUrl: '',
                }
            ],
        }
    },
    methods: {
        onImagePicked(file) {
            let i = this.menu_imgs_index
            if (file !== undefined && file !== null) {
                if (file.name.lastIndexOf('.') <= 0) {
                    return
                }
                const fr = new FileReader()
                fr.readAsDataURL(file)
                fr.addEventListener('load', () => {
                    this.menu_imgs[i].uploadImageUrl = fr.result
                })
            } else {
                this.menu_imgs[i].uploadImageUrl = ''
            }
        },
        selectImage(index) {
            this.menu_imgs_index = index
        },
    }
}