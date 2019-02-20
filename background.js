//
// background.jsは、拡張機能が有効だと常に読み込まれているjs
// イベントに対するControler的な役割にすると良さそう
//
// 直下の指定だと、ページが読み込まれるごとにアラートが出力される。いまは、コメント
// alert("background.jsの疎通");


// アドレスバーの右側の拡張機能のアイコンをクリックした際のイベント
// ※ manifest.jsonの"browser_action"=>"default_popup"の指定があると無効になる

chrome.browserAction.onClicked.addListener( function() {
  // var action_url = "javascript:window.print();";
  // chrome.tabs.update(tab.id, {url: action_url});
  //console.log("icon clicked");
});
