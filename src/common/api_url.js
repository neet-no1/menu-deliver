/**
 * 基底URL
 */
export const BASE_URL = '/api';

/**
 * ログインAPI
 */
export const POST_LOGIN = BASE_URL + '/login';

/**
 * ログアウトAPI
 */
export const POST_LOGOUT = BASE_URL + '/logout';

/**
 * お知らせ情報取得
 */
export const GET_NOTICE = BASE_URL + '/notice';

/**
 * ログイン状態取得
 */
export const GET_ACCOUNT_AUTH = BASE_URL + '/account/auth';

/**
 * アカウント登録
 */
export const POST_ACCOUNT_REGIST = BASE_URL + '/account/regist';

/**
 * メールアドレス有効性確認
 */
export const GET_ACCOUNT_EMAIL_CONFIRM = BASE_URL + '/account/email/confirm';

/**
 * パスワードリセット
 */
export const POST_PASSWORD_RESET = BASE_URL + '/password/reset';

/**
 * アカウント情報取得
 */
export const GET_ACCOUNT_INFO = BASE_URL + '/account/info';

/**
 * アカウント情報更新
 */
export const POST_ACCOUNT_INFO_UPDATE = BASE_URL + '/account/info/update';

/**
 * パスワード更新
 */
export const POST_ACCOUNT_PASSWORD_UPDATE = BASE_URL + '/account/password/update';

/**
 * ユーザをフォローする
 */
export const POST_FOLLOW = BASE_URL + '/follow';

/**
 * フォローフォロワー取得
 */
export const GET_FOLLOW_LIST = BASE_URL + '/follow/list';

/**
 * おすすめ情報表示パラメタを取得
 */
export const GET_RECOMMEND_META = BASE_URL + '/reccomend/meta';

/**
 * 新着献立取得
 */
export const GET_MENU_NEWARRIVAL = BASE_URL + '/menu/newarrival';

/**
 * 人気献立取得
 */
export const GET_MENU_POPULAR = BASE_URL + '/menu/popular';

/**
 * 投稿献立一覧取得
 */
export const GET_ACCOUNT_POSTED_MENUS = BASE_URL + '/account/posted/menus';

/**
 * 献立カテゴリ取得
 */
export const GET_MENU_CATEGORIES = BASE_URL + '/menu/categories';

/**
 * 献立投稿
 */
export const POST_MENU = BASE_URL + '/menu';

/**
 * 献立内容取得
 */
export const GET_MENU = BASE_URL + '/menu';

/**
 * 献立削除
 */
export const POST_MENU_DELETE = BASE_URL + '/menu/delete';

/**
 * 献立お気に入り追加・解除
 */
export const POST_MENU_FAVORITE = BASE_URL + '/menu/favorite';

/**
 * 献立検索
 */
export const GET_SEARCH_MENUS = BASE_URL + '/search/menus';

/**
 * 新着記事取得
 */
export const GET_ARTICLE_NEWARRIVAL = BASE_URL + '/article/newarrival';

/**
 * 投稿記事一覧取得
 */
export const GET_ACCOUNT_POSTED_ARTICLES = BASE_URL + '/account/posted/articles';

/**
 * 記事検索
 */
export const GET_SEARCH_ARTICLES = BASE_URL + '/search/articles';

/**
 * 記事投稿
 */
export const POST_ARTICLE = BASE_URL + '/article';

/**
 * 記事内容取得
 */
export const GET_ARTICLE = BASE_URL + '/article';

/**
 * 記事削除
 */
export const POST_ARTICLE_DELTE = BASE_URL + '/article/delete';

/**
 * 記事お気に入り追加・解除
 */
export const POST_ARTICLE_FAVORITE = BASE_URL + '/article/favorite';

/**
 * 質問検索
 */
export const GET_SEARCH_QUESTIONS = BASE_URL + '/search/questions';

/**
 * 質問カテゴリ取得
 */
export const GET_QUESTION_CATEGORIES = BASE_URL + '/question/categories';

/**
 * 質問投稿
 */
export const POST_QUESTION = BASE_URL + '/question';

/**
 * 質問内容取得
 */
export const GET_QUESTION = BASE_URL + '/question';

/**
 * 回答投稿
 */
export const POST_QUESTION_ANSWER = BASE_URL + '/question/answer';

/**
 * 回答一覧取得
 */
export const GET_QUESTION_ANSWERS = BASE_URL + '/question/answers';

/**
 * ベストアンサー取得
 */
export const GET_QUESTION_BASTANSWER = BASE_URL + '/question/bestanswer';

/**
 * ベストアンサー決定
 */
export const POST_QUESTION_BESTANSWER = BASE_URL + '/question/bestanswer';

/**
 * お気に入り一覧を取得
 */
export const GET_ACCOUNT_FAVORITES = BASE_URL + '/account/favorites';