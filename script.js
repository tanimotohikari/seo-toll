'use strict'

  var url = '';
  //var title = '';

  // ▼タブの名前の一覧の取得
  // chrome.tabs.query({}, function(tabs) {
  //   let i;
  //   for(i = 0; i < tabs.length; i++) {
  //     //console.log(tabs[i]);
  //   }
  // });

  chrome.tabs.getSelected(null, function(tab) {
    document.getElementById('title').innerHTML = tab.title;
    document.getElementById('url').innerHTML = tab.url;

    var xhr = new XMLHttpRequest();
    xhr.responseType  = "document";

    xhr.onload = function(e){
      var dom = e.target.responseXML;
      var links = dom.querySelectorAll('link');
      for (var index = 0; index < links.length; index++) {
        if(links[index].outerHTML.match(/canonical/)) {
          var linksValue = links[index].outerHTML.split(/=| /);
          linksValue = linksValue[2].replace(/"/g , '');
          document.getElementById('canonical').innerHTML = linksValue;
        }
      }
    };

    xhr.open("get", tab.url);
    xhr.send();

  });
