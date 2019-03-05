
// 変数の初期化
var xRobotsTag = ''

// ページの読み込み完了時にレスポンスを取得
chrome.webRequest.onCompleted.addListener(
  function(details) {
    if (details.type !== 'main_frame') return;
    details.responseHeaders.map(function(header) {
      if (header["name"] !== "x-robots-tag") return;
      xRobotsTag = header["value"];
    });
  }, {urls: ['<all_urls>']}, ["responseHeaders"]
);

// popupが開かれたことを受け取り、tagをcontent_script側に送信
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    if (request == 'callBackground') {
      sendResponse({ message: xRobotsTag });
    }
  }
);

