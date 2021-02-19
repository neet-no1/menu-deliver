/**
 * 基底URL
 */
export const BASE_URL = '/api';

/**
 * ログインAPI
 */
export const POST_LOGIN = BASE_URL + '/login';

/**
 * 商品取得(新着)API
 */
export const GET_NEW_ARRIVAL_PRODUCTS = BASE_URL + '/product/new_arrival';

/**
 * 商品取得(キーワード)API
 */
export const GET_PRODUCT_SEARCH_KEYWORD = BASE_URL + '/product/search/keyword';

/**
 * 商品取得(カテゴリ)API
 */
export const GET_PRODUCT_SEARCH_CATEGORY = BASE_URL + '/product/search/category';

/**
 * カテゴリ一覧取得API
 */
export const GET_CATEGORY_LIST = BASE_URL + '/category/list';
