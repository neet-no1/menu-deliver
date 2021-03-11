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
    }
}