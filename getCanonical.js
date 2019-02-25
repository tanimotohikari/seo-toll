'use strict'

// ▼タブの名前の一覧の取得
chrome.tabs.query({}, function(tabs) {
  let i;
  for(i = 0; i < tabs.length; i++) {
    //console.log(tabs[i]);
  }
});

//let links = document.getElementsByTagName('link');
//let canonical = '';
//let title = document.getElementByTagName('h1');
//console.log(title);


// for (var i = 0; i < links.length; i++) {
//   if (links[i].rel) {
//     if (links[i].rel.toLowerCase() == "canonical") {
//       canonical = links[i].href;
//     }
//   }

//console.log(canonical);


// chrome.browserAction.onClicked.addListener(function(tab) {
//   alert(tab.url);
//   // var action_url = "javascript:window.print();";
//   // chrome.tabs.update(tab.id, {url: action_url});
// });

chrome.tabs.getSelected(null, function(tab) {
  document.getElementById('title').innerHTML = tab.title;
  document.getElementById('url').innerHTML = tab.url;
});
