import Vue from 'vue'

import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'

import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'
import MediaCardLarge from '../pages/module/MediaCardLarge.vue'
import Pagenation from '../pages/module/Pagenation.vue'

export default {
    name: 'ArticleList',
    components: {
        PageHeader,
        PageFooter,
        MediaCardLarge,
        Pagenation
    },
    data() {
        return {
            // キーワード
            keyword: '',

            // 記事一覧情報
            articles: [],

            // ページング情報
            posted_article_pages: {
                total_page: 1,
                current_page: 1,
                callback: (n) => {
                    this.page = n
                    this.search_article()
                }
            },

            // 表示ページ番号
            page: 1,
        }
    },
    methods: {
        get_items() {
            // 記事一覧を取得する
            this.search_article()
        },
        search_article() {
            new ApiUtils().getAccess(
                URL.GET_SEARCH_ARTICLES,
                {
                    "keyword": this.keyword,
                    "page": this.page
                },
                (response) => {
                    if (response.code == 0) {
                        let info = response.info

                        // 献立一覧を整形する
                        this.articles = info.articles.map((e) => {
                            return {
                                id: e.id,
                                title: e.title,
                                detail: e.detail,
                                img: e.imgPath,
                                date: e.date,
                                user_icon: e.userIconPath,
                                item_class: [''],
                                img_class: ['el_article_item_img__large'],
                                title_class: [''],
                                date_class: [''],
                                isDetail: true,
                                isIcon: false,
                                link: '/article/item?id=' + e.id
                            };
                        });

                        // ページング情報を設定する
                        this.posted_article_pages = {
                            total_page: info.page.totalPages,
                            current_page: info.page.currentPage,
                            callback: (n) => {
                                this.page = n
                                this.search_article()
                            }
                        };
                    } else {
                        alert(response.errorInfo.errorMessage)
                        console.log('記事検索エラー')
                        console.log(response)
                    }
                }
            );
        },
    },
    mounted() {
        this.get_items()
    },
}