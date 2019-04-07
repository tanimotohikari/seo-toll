# seo-toll

## 機能一覧

- SEO関連のタグの値を表示
- 文書校正
- hタグの取得

## SEO関連のタグの値を表示

- title
- url
- canonical
- description
- x-robots-tag
- noindex
- nofollow
- next
- prev

## 文書校正
yahooの文書校正APIを使用しているため説明は割愛します。
[API](https://developer.yahoo.co.jp/webapi/jlp/kousei/v1/kousei.html)

## hタグの取得
DOMの中からh1~h4のタグを取得してきている。

## Googleの拡張ツールは誰でも作れる
はじめに登録料は取られるけど誰でも簡単にUPできる
[管理画面](https://chrome.google.com/webstore/developer/dashboard?authuser=0&hl=ja&pli=1)
UPの仕方はzipに圧縮してアップロードするだけなので簡単。

## 困ったこと

### 拡張ツール通しが競合してエラーが起きる

### backgroundとcontentsとpopupでの情報のやりとりを理解するのに少し時間がかかった

### デバックの方法も少し特殊、手順良くやらないと修正した分が反映されない
