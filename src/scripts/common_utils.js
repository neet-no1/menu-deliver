import * as URL from '../common/api_url'
import ApiUtils from '../scripts/api_utils'

export default class CommonUtils {

    /**
     * アクセスしたURLのクエリパラメタを取得
     */
    getQueryParam() {
        return window.location.search.substring(1).split('&').map((p) => p.split('='))
            .reduce((obj, e) => ({ ...obj, [e[0]]: e[1] }), {})
    }

    /**
     * ログインしていなければログインページへ遷移
     */
    isAuthToLogin() {
        let _this = this;
        new ApiUtils().getAccess(
            URL.GET_ACCOUNT_AUTH,
            {},
            (response) => {
                if (response.code == 0) {
                    if (response.info) {
                        // 認証済みであれば何もしない
                    } else {
                        // 認証されていなければログインページへ遷移
                        _this.$router.push('/login')
                    }
                } else {
                    console.log('認証状態取得に失敗しました。')
                }
            }
        )
    }
}