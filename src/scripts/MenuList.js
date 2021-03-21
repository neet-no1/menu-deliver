import Vue from 'vue'

import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'

import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'
import MediaCard from '../pages/module/MediaCard.vue'
import Pagenation from '../pages/module/Pagenation.vue'

export default {
    name: 'MenuList',
    components: {
        PageHeader,
        PageFooter,
        MediaCard,
        Pagenation
    },
    data() {
        return {
            // カテゴリ一覧
            categories: [],

            // ページング情報
            posted_menu_pages: {
                total_page: 1,
                current_page: 1,
                callback: (n) => {
                    this.page = n
                    this.search_menus()
                }
            },

            // 献立一覧情報
            menus: [],

            // チェックしたカテゴリ
            checked_categories: [],

            // キーワード
            keyword: '',

            // 表示ページ番号
            page: 1,
        }
    },
    methods: {
        get_items() {
            // 献立カテゴリをしゅとく
            this.get_menu_categories()

            // 献立一覧を取得する
            this.search_menus()
        },
        get_menu_categories() {
            new ApiUtils().getAccess(
                URL.GET_MENU_CATEGORIES,
                {},
                (response) => {
                    if (response.code == 0) {
                        // 献立一覧を整形する
                        this.categories = response.info
                    } else {
                        alert('エラーが発生しました。')
                        console.log('献立カテゴリ取得エラー')
                        console.log(response)
                    }
                }
            );
        },
        search_menus() {
            new ApiUtils().getAccess(
                URL.GET_SEARCH_MENUS,
                {
                    "keyword": this.keyword,
                    "categories": this.checked_categories,
                    "page": this.page
                },
                (response) => {
                    if (response.code == 0) {
                        let info = response.info

                        // 献立一覧を整形する
                        this.menus = info.menus.map((e) => {
                            return {
                                id: e.id,
                                title: e.title,
                                img_src: e.thumbPath,
                                title_class: ['el_menu_title__small'],
                                img_class: ['el_menu_img__small'],
                            }
                        });

                        // ページング情報を設定する
                        this.posted_menu_pages = {
                            total_page: info.page.totalPages,
                            current_page: info.page.currentPage,
                            callback: (n) => {
                                this.page = n
                                this.search_menus()
                            }
                        };
                    } else {
                        alert('エラーが発生しました。')
                        console.log('献立検索エラー')
                        console.log(response)
                    }
                }
            );
        }
    },
    mounted() {
        this.get_items()
    },
}