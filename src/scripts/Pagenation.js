import Vue from 'vue'

/**
 * pages: {
 *   number: 3, // 総ページ数
 *   current_page: 2, // 現在のページ番号
 *   callback: function(n){}, // ページ遷移を行う関数
 * }
 */
export default {
    name: 'Pagenation',
    props: [
        'pages'
    ],
    data() {
        return {}
    },
    methods: {
        move_next_page() {
            this.pages.callback(this.pages.current_page + 1)
        },
        move_previous_page() {
            this.pages.callback(this.pages.current_page - 1)
        },
        move_page(n) {
            this.pages.callback(n)
        },
        is_current_page(n) {
            return this.pages.current_page == n
        }
    }
}