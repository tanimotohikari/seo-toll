// 変数の初期化
var xRobotsTag = '';
var url = '';
// ページの読み込み完了時にレスポンスを取得
chrome.webRequest.onCompleted.addListener(
  function(details) {
    if (details.type !== 'main_frame') return;
    url = details.url;
    // ヘッダーからxrobotstagを探す
    var xRobotsTagHeader = details.responseHeaders.find(function(element){
      return element["name"] === 'x-robots-tag';
    });
    // xrobotstagがあればその値を入れる。なければ空文字代入。
    if (xRobotsTagHeader) {
      xRobotsTag = xRobotsTagHeader['value'];
    } else {
      xRobotsTag = '';
    }
  }, {urls: ["https://*/*","http://*/*"]}, ["responseHeaders"]
);

// popupが開かれたことを受け取り、tagをcontent_script側に送信
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request == 'callBackground') {
      sendResponse({ message: xRobotsTag, url: url });
    }
  }
);
