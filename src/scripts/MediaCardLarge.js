import Vue from 'vue'

export default {
    name: 'MediaCardLarge',
    props: [
        'article'
    ],
    data() {
        return {
            user_icon: {
                'background-image': 'url(' + this.article.user_icon + ')'
            }
        }
    },
    methods: {
        click_link() {
            // リンク先に遷移する
            window.location.href = this.article.link
        }
    },
    computed: {
        status_posted() {
            return this.article.status === 'posted'
        },
        status_editing() {
            return this.article.status === 'editing'
        }
    }
}