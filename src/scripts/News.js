import Vue from 'vue'
import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'

export default {
    name: 'News',
    data() {
        return {
            // お知らせ情報
            news_list: [],
        }
    },
    methods: {
        get_news() {
            new ApiUtils().getAccess(
                URL.GET_NOTICE,
                {},
                (response) => {
                    if (response.code == 0) {
                        this.news_list = response.info
                    } else {
                        alert('エラーが発生しました。')
                        console.log('お知らせ情報取得エラー')
                        console.log(response)
                    }
                }
            )
        }
    },
    computed: {
        disable_news: function() {
            return news_list.length != 0
        }
    },
    mounted() {
        this.get_news()
    }
}