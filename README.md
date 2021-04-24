# menu-deliver

menu-deliverとは[menu-deliver](https://www.menu-deliver.com/about)サービスのWEBフロントエンドプロジェクトである。

# 環境構築
## 前提条件
・[node.js](https://nodejs.org/ja/download/)をインストールしていること  

## 起動手順

最初に以下を実行

```
$ git clone https://github.com/neet-no1/menu-deliver.git
$ cd menu-deliver
$ npm install
```

次に、環境に合わせて起動コマンドを実行

1. APIサーバーなしでの起動(APIがモック)
```
$ npm run dev
```

2. APIサーバーありでの起動(APIサーバーへ接続)
```
$ npm run start
```

# 開発における情報
## フォルダ構成
`src/pages/`：vueファイルを格納。templateタグとscriptタグで構成される。templateタグにはHTMLを記載する。scriptタグには対象JSファイルへのリンクを記載する。  
`src/scripts/`：jsファイルを格納。vue.jsを使用したJavaScriptを記載。vueファイルにより読み込まれる。  
`src/css/`：スタイルシートを格納。scssで記載。全てのページに有効なスタイルとなるので、命名などには注意が必要。  
`src/common/`：JSで使用する定数や共通の関数を格納。  

## ルーティング
ルーティングについては、`src/routes.js`に記載。  
`'URLのパス': 'Vueファイルの名称'`の形で定義する。  

## 新規ページ追加
`src/pages/`：Vueファイルを追加する。HTMLファイルと同様の扱いを行う。  
`src/scripts/`：Vueファイルから読み込むJSファイルを追加する。Vue.jsで記載する。  
`src/css/`：scssファイルを追加する。ページ毎にファイルを分け、style.scssに読み込むように定義する。  

## APIモックの追加方法
`src/scripts/mock/api_mock.js`の`load()`関数に追記することによりモックを追加できる。  
追記内容は以下の通り  
```
$.mockjax(new AjaxMock().success(
    <モック対象のURL>,
    <モック対象のレスポンスで取得するデータ>,
    <モック対象のHTTPメソッド>
));
```

例) `URL.POST_LOGOUT`を追加する  
```
    load() {
        $.mockjax(new AjaxMock().success(
            URL.POST_LOGIN,
            {text: 'url'},
            'post'
        ));
    }
```
↓  
```
    load() {
        $.mockjax(new AjaxMock().success(
            URL.POST_LOGIN,
            {text: 'url'},
            'post'
        ));
        $.mockjax(new AjaxMock().success(
            URL.POST_LOGOUT,
            {text: 'sample'},
            'post'
        ));
    }
```
※`URL.POST_LOGOUT`は`src/scripts/common/api_url.js`に記載  

# License
The source code is licensed MIT. 
