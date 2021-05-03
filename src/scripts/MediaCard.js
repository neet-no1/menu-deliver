import Vue from 'vue'

export default {
    name: 'MediaCard',
    props: [
        'menu'
    ],
    data() {
        return {
            loading: false,
            selection: 1
        }
    },
    methods: {
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
        click_link() {
            // リンク先に遷移する
            this.$router.push(this.menu.link)
        }
    },
    computed: {
        status_posted() {
            return this.menu.status === 'posted'
        },
        status_editing() {
            return this.menu.status === 'editing'
        }
    }
}