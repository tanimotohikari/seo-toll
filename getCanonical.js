'use strict'

// ▼タブの名前の一覧の取得
chrome.tabs.query({}, function(tabs) {
  let i;
  for(i = 0; i < tabs.length; i++) {
    //console.log(tabs[i]);
  }
});

let links = document.getElementsByTagName('link');
let canonical = '';

console.log(chrome.browsingData);


// for (var i = 0; i < links.length; i++) {
//   if (links[i].rel) {
//     if (links[i].rel.toLowerCase() == "canonical") {
//       canonical = links[i].href;
//     }
//   }

//console.log(canonical);


//chrome.browserAction.onClicked.addListener(function(tab) {
  //alert('hoge');
  // var action_url = "javascript:window.print();";
  // chrome.tabs.update(tab.id, {url: action_url});
//});
