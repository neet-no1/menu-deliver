import Vue from 'vue'

export default {
    name: 'Follower',
    props: [
        'follower'
    ],
    data() {
        return {
            user_icon: {
                'background-image': 'url('+ this.follower.user_icon +')'
            },
        }
    }
}