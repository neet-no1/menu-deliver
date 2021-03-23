import Vue from 'vue'

import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'

import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'
import Pagenation from '../pages/module/Pagenation.vue'

export default {
    name: 'Question',
    components: {
        PageHeader,
        PageFooter,
        Pagenation
    },
    data() {
        return {

            // 質問カテゴリ
            categories: [],
            selected_categories: [],

            // キーワード
            keyword: '',

            // 現在ページ番号
            current_page_new_arrival: 1,
            current_page_unsolved: 1,
            current_page_solved: 1,

            // 新着質問一覧
            question_new_arrival: [],
            page_new_arrival: {
                total_page: 1,
                current_page: 1,
                callback: (n) => {
                    this.current_page_new_arrival = n
                    this.search_questions()
                }
            },

            // 未解決質問一覧
            question_unsolved: [],
            page_unsolved: {
                total_page: 1,
                current_page: 1,
                callback: (n) => {
                    this.current_page_unsolved = n
                    this.search_questions()
                }
            },

            // 解決済み質問一覧
            question_solved: [],
            page_solved: {
                total_page: 1,
                current_page: 1,
                callback: (n) => {
                    this.current_page_solved = n
                    this.search_questions()
                }
            },

            // タブ切り替え関連
            new_question: 'new_question',
            unsolved_question: 'unsolved_question',
            solved_question: 'solved_question',

            active_tab: 'new_question'
        }
    },
    methods: {
        get_items() {
            // 質問のカテゴリを取得する
            this.get_question_categories()

            // 質問一覧取得
            this.search_questions()
        },
        get_question_categories() {
            new ApiUtils().getAccess(
                URL.GET_QUESTION_CATEGORIES,
                {},
                (response) => {
                    if (response.code == 0) {
                        this.categories = response.info
                    } else {
                        alert('エラーが発生しました。')
                        console.log('質問カテゴリ取得エラー')
                        console.log(response)
                    }
                }
            )
        },
        search_questions() {
            new ApiUtils().getAccess(
                URL.GET_SEARCH_QUESTIONS,
                {
                    "tags": this.selected_categories,
                    "keyword": this.keyword,
                    "pageNewArrival": this.current_page_new_arrival,
                    "pageUnsolved": this.current_page_unsolved,
                    "pageSolved": this.current_page_solved
                },
                (response) => {
                    if (response.code == 0) {
                        let info = response.info
                        this.question_new_arrival = info.questionsNewArrival
                        this.page_new_arrival = {
                            total_page: info.pageNewArrival.totalPages,
                            current_page: info.pageNewArrival.currentPage,
                            callback: (n) => {
                                this.current_page_new_arrival = n
                                this.search_questions()
                            }
                        }

                        this.question_unsolved = info.questionsUnsolved
                        this.page_unsolved = {
                            total_page: info.pageUnsolved.totalPages,
                            current_page: info.pageUnsolved.currentPage,
                            callback: (n) => {
                                this.current_page_unsolved = n
                                this.search_questions()
                            }
                        }

                        this.question_solved = info.questionsSolved
                        this.page_solved = {
                            total_page: info.pageSolved.totalPages,
                            current_page: info.pageSolved.currentPage,
                            callback: (n) => {
                                this.current_page_solved = n
                                this.search_questions()
                            }
                        }
                    } else {
                        alert('エラーが発生しました。')
                        console.log('質問検索エラー')
                        console.log(response)
                    }
                }
            )
        },
        open_question(question) {
            // 質問詳細ページを開く
            window.location.href = '/question/detail?id=' + question.id
        },
        open_post_question() {
            // 質問投稿ページを開く
            window.location.href = '/post/question'
        }
    },
    computed: {
        isActive_new_question: function () {
            return this.active_tab == this.new_question
        },
        isActive_unsolved_question: function () {
            return this.active_tab == this.unsolved_question
        },
        isActive_solved_question: function () {
            return this.active_tab == this.solved_question
        }
    },
    mounted() {
        this.get_items()
    }
}