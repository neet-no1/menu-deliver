import Vue from 'vue'

export default {
    name: 'PageHeader',
    data() {
        return {
            select_post_type: false,
            isLogin: false
        }
    },
    methods: {
        post_menu_or_article: function() {
            this.select_post_type = this.select_post_type == false
        },
        close_modal: function() {
            this.select_post_type = false
        },
        close_modal_cancel: function(event) {
            if(event) {
                event.preventDefault()
                event.stopPropagation()
            }
        }
    }
}