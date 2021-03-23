import AjaxMock from "./ajax_mock";
import * as URL from "../../common/api_url";

import basic_success from "./data/basic_response_success.json";
import notice_success from "./data/notice_success.json";
import account_auth_success from "./data/account_auth_success.json";
import account_success from "./data/account_success.json";
import followers_success from "./data/followers_success.json";
import recommend_meta_success from "./data/recommend_meta_success.json";
import menus_success from "./data/menus_success.json";
import menu_categories_success from "./data/menu_categories_success.json";
import menu_data_success from "./data/menu_data_success.json";
import articles_success from "./data/articles_success.json";
import article_data_success from "./data/article_data_success.json";
import questions_success from "./data/questions_success.json";
import question_categories_success from "./data/question_categories_success.json";
import question_data_success from "./data/question_data_success.json";
import answers_success from "./data/answers_success.json";
import best_answer_success from "./data/best_answer_success.json";
import menus_and_articles_success from "./data/menus_and_articles_success.json";
import compositions_success from "./data/compositions_success.json";
import favorite_menu_item_success from "./data/favorite_menu_item_success.json";
import favorite_article_item_success from "./data/favorite_article_item_success.json";

export default class ApiMock {

    constructor() {
        console.log('ApiMock constructor');
        console.log($);
        this.load = this.load.bind(this);
        this.POST = 'post';
        this.GET = 'get';
    }

    load() {
        // ログイン
        $.mockjax(new AjaxMock().success(
            URL.POST_LOGIN,
            basic_success,
            this.POST
        ));

        // お知らせ情報取得
        $.mockjax(new AjaxMock().success(
            URL.GET_NOTICE,
            notice_success,
            this.GET
        ));

        // ログイン状態取得
        $.mockjax(new AjaxMock().success(
            URL.GET_ACCOUNT_AUTH,
            account_auth_success,
            this.GET
        ));

        // アカウント登録
        $.mockjax(new AjaxMock().success(
            URL.POST_ACCOUNT_REGIST,
            basic_success,
            this.POST
        ));

        // メールアドレス有効性確認
        $.mockjax(new AjaxMock().success(
            URL.GET_ACCOUNT_EMAIL_CONFIRM,
            basic_success,
            this.GET
        ));

        // パスワードリセット
        $.mockjax(new AjaxMock().success(
            URL.POST_PASSWORD_RESET,
            basic_success,
            this.POST
        ));

        // アカウント情報取得
        $.mockjax(new AjaxMock().success(
            URL.GET_ACCOUNT_INFO,
            account_success,
            this.GET
        ));

        // アカウント情報更新
        $.mockjax(new AjaxMock().success(
            URL.POST_ACCOUNT_INFO_UPDATE,
            basic_success,
            this.POST
        ));

        // パスワード更新
        $.mockjax(new AjaxMock().success(
            URL.POST_ACCOUNT_PASSWORD_UPDATE,
            basic_success,
            this.POST
        ));

        // ユーザをフォローする
        $.mockjax(new AjaxMock().success(
            URL.POST_FOLLOW,
            basic_success,
            this.POST
        ));

        // フォロー・フォロワー取得
        $.mockjax(new AjaxMock().success(
            URL.GET_FOLLOW_LIST,
            followers_success,
            this.GET
        ));

        // おすすめ情報表示パラメタを取得
        $.mockjax(new AjaxMock().success(
            URL.GET_RECOMMEND_META,
            recommend_meta_success,
            this.GET
        ));

        // 新着献立取得
        $.mockjax(new AjaxMock().success(
            URL.GET_MENU_NEWARRIVAL,
            menus_success,
            this.GET
        ));

        // 人気献立取得
        $.mockjax(new AjaxMock().success(
            URL.GET_MENU_POPULAR,
            menus_success,
            this.GET
        ));

        // 投稿献立一覧取得
        $.mockjax(new AjaxMock().success(
            URL.GET_ACCOUNT_POSTED_MENUS,
            menus_success,
            this.GET
        ));

        // 献立検索
        $.mockjax(new AjaxMock().success(
            URL.GET_SEARCH_MENUS,
            menus_success,
            this.GET
        ));

        // 献立カテゴリ取得
        $.mockjax(new AjaxMock().success(
            URL.GET_MENU_CATEGORIES,
            menu_categories_success,
            this.GET
        ));

        // 献立投稿
        $.mockjax(new AjaxMock().success(
            URL.POST_MENU,
            basic_success,
            this.POST
        ));

        // 献立内容取得
        $.mockjax(new AjaxMock().success(
            URL.GET_MENU,
            menu_data_success,
            this.GET
        ));

        // 献立削除
        $.mockjax(new AjaxMock().success(
            URL.POST_MENU_DELETE,
            basic_success,
            this.POST
        ));

        // 献立お気に入り追加・解除
        $.mockjax(new AjaxMock().success(
            URL.POST_MENU_FAVORITE,
            basic_success,
            this.POST
        ));

        // 新着記事取得
        $.mockjax(new AjaxMock().success(
            URL.GET_ARTICLE_NEWARRIVAL,
            articles_success,
            this.GET
        ));

        // 投稿記事一覧取得
        $.mockjax(new AjaxMock().success(
            URL.GET_ACCOUNT_POSTED_ARTICLES,
            articles_success,
            this.GET
        ));

        // 記事検索
        $.mockjax(new AjaxMock().success(
            URL.GET_SEARCH_ARTICLES,
            articles_success,
            this.GET
        ));

        // 記事投稿
        $.mockjax(new AjaxMock().success(
            URL.POST_ARTICLE,
            basic_success,
            this.POST
        ));

        // 記事内容取得
        $.mockjax(new AjaxMock().success(
            URL.GET_ARTICLE,
            article_data_success,
            this.GET
        ));

        // 記事削除
        $.mockjax(new AjaxMock().success(
            URL.POST_ARTICLE_DELTE,
            basic_success,
            this.POST
        ));

        // 記事お気に入り追加・解除
        $.mockjax(new AjaxMock().success(
            URL.POST_ARTICLE_FAVORITE,
            basic_success,
            this.POST
        ));

        // 質問検索
        $.mockjax(new AjaxMock().success(
            URL.GET_SEARCH_QUESTIONS,
            questions_success,
            this.GET
        ));

        // 質問カテゴリ取得
        $.mockjax(new AjaxMock().success(
            URL.GET_QUESTION_CATEGORIES,
            question_categories_success,
            this.GET
        ));

        // 質問投稿
        $.mockjax(new AjaxMock().success(
            URL.POST_QUESTION,
            basic_success,
            this.POST
        ));

        // 質問内容取得
        $.mockjax(new AjaxMock().success(
            URL.GET_QUESTION,
            question_data_success,
            this.GET
        ));

        // 回答投稿
        $.mockjax(new AjaxMock().success(
            URL.POST_QUESTION_ANSWER,
            basic_success,
            this.POST
        ));

        // 回答一覧取得
        $.mockjax(new AjaxMock().success(
            URL.GET_QUESTION_ANSWERS,
            answers_success,
            this.GET
        ));

        // ベストアンサー取得
        $.mockjax(new AjaxMock().success(
            URL.GET_QUESTION_BESTANSWER,
            best_answer_success,
            this.GET
        ));

        // ベストアンサー決定
        $.mockjax(new AjaxMock().success(
            URL.POST_QUESTION_BESTANSWER,
            basic_success,
            this.POST
        ));

        // お気に入り一覧を取得
        $.mockjax(new AjaxMock().success(
            URL.GET_ACCOUNT_FAVORITES,
            menus_and_articles_success,
            this.GET
        ));

        // 食品成分表情報取得
        $.mockjax(new AjaxMock().success(
            URL.GET_MENU_COMPOSITIONS,
            compositions_success,
            this.GET
        ));

        // 献立のお気に入り追加状態を取得
        $.mockjax(new AjaxMock().success(
            URL.GET_FAVORITE_MENU_ITEM,
            favorite_menu_item_success,
            this.GET
        ));

        // 記事のお気に入り追加状態を取得
        $.mockjax(new AjaxMock().success(
            URL.GET_FAVORITE_ARTICLE_ITEM,
            favorite_article_item_success,
            this.GET
        ));
    }
}