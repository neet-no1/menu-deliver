import $ from "jquery";

export default class ApiUtils {

    constructor(schema, hostname, port) {
        // https: などのスキーマ
        this.schema = schema ? schema : location.protocol;
        // localhost などのホスト名
        this.hostname = hostname ? hostname : location.hostname;
        // 8080 などのポート番号
        this.port = port ? port : location.port;
        console.log('ApiUtils schema: ' + schema);
        console.log('ApiUtils hostname: ' + hostname);
        console.log('ApiUtils port: ' + port);
    }

    getAccess(url, parameter, callback) {
        return this.access(url, parameter, 'get', callback);
    }

    postAccess(url, parameter, callback) {
        this.access(url, parameter, 'post', callback);
    }

    access(url, parameter, type, callback) {
        console.log('access URL:' + url);
        // TODO 発行したトークンの設定を行いたい。(ヘッダに)
        $.ajax({
            url: url,
            type: type,
            cache: false,
            dataType: 'json',
            data: parameter
        })
            .done(function (response) {
                // TODO 通信成功時
                // 何を見て何をレスポンスとして返すかを設計する
                callback(response);
            })
            .fail(function (xht) {
                // TODO 通信失敗時
                // 何を見て何をレスポンスとして返すかを設計する
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
        // TODO 発行したトークンの設定を行いたい。(ヘッダに)
        $.ajax({
            url: url,
            type: 'post',
            cache: false,
            processData: false,
            contentType: 'multipart/form-data',
            data: formData
        })
            .done(function (response) {
                // TODO 通信成功時
                // 何を見て何をレスポンスとして返すかを設計する
                callback(response);
            })
            .fail(function (xht) {
                // TODO 通信失敗時
                // 何を見て何をレスポンスとして返すかを設計する
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
}