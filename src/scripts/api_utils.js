import $ from "jquery";

export default class ApiUtils {

    constructor(schema, hostname, port) {
        // https: などのスキーマ
        this.schema = schema ? schema : location.protocol;
        // localhost などのホスト名
        this.hostname = hostname ? hostname : location.hostname;
        // 8080 などのポート番号
        this.port = port ? port : location.port;
    }

    getAccess(url, parameter, callback) {
        return this.access(url, parameter, 'GET', callback);
    }

    postAccess(url, parameter, callback) {
        this.access(url, JSON.stringify(parameter), 'POST', callback);
    }

    access(url, parameter, type, callback) {
        // TODO 発行したトークンの設定を行いたい。(ヘッダに)
        $.ajax({
            url: url,
            type: type,
            cache: false,
            dataType: 'json',
            async: false,
            data: parameter,
            mimeType: 'UTF-8',
            contentType: 'application/json'
        })
            .done(function (response) {
                // TODO 通信成功時
                // 何を見て何をレスポンスとして返すかを設計する
                callback(response);
            })
            .fail(function (xht, textStatus, errorThrown) {
                // TODO 通信失敗時
                // 何を見て何をレスポンスとして返すかを設計する
                console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
                console.log("errorThrown    : " + errorThrown.message); // 例外情報
                callback(xht);
            })
        /*
    .always(function(xhr, msg) {
        // TODO 通信完了時の処理
        // 結果にかかわらず実行したい処理を設計する
        // 必要なければ、削除する
        callback(msg);
    })
    */
    }

    formDataAccess(url, formData, callback) {
        console.log('access URL:' + url);
        console.log('data:');
        console.log(formData);
        // TODO 発行したトークンの設定を行いたい。(ヘッダに)
        $.ajax({
            url: url,
            type: 'post',
            cache: false,
            processData: false,
            async: false,
            contentType: false,
            mimeType: 'UTF-8',
            data: formData
        })
            .done(function (response) {
                // TODO 通信成功時
                // 何を見て何をレスポンスとして返すかを設計する
                callback(JSON.parse(response));
            })
            .fail(function (xht, textStatus, errorThrown) {
                // TODO 通信失敗時
                // 何を見て何をレスポンスとして返すかを設計する
                console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
                console.log("errorThrown    : " + errorThrown.message); // 例外情報
                callback(xht);
            })
        /*
    .always(function(xhr, msg) {
        // TODO 通信完了時の処理
        // 結果にかかわらず実行したい処理を設計する
        // 必要なければ、削除する
        callback(msg);
    })
    */
    }

    /**
     * 画像ファイル取得
     * @param {*} url 画像URL
     * @param {*} callback 取得データ処理コールバック関数
     */
    getImage(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.response);
            }
        }
        xhr.send();
    }
}