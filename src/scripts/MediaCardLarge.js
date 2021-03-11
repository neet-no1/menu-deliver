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
    }
}