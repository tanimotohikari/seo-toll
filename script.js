'use strict'

  var url = '';

  // ▼タブの名前の一覧の取得
  // chrome.tabs.query({}, function(tabs) {
  //   let i;
  //   for(i = 0; i < tabs.length; i++) {
  //     //console.log(tabs[i]);
  //   }
  // });

  //HTMLHeadingElement hタグの取得

  //samuraiのrankingではエラーで動かない
  function extractCanonical(array) {
    for (var index = 0; index < array.length; index++) {
      // 引数で渡された配列の中から canonical がrel属性に設定されているものを探す
      if(array[index].outerHTML.match('canonical')) {
        var html = array[index].outerHTML;
        html = html.split(/ /);

        // htmlからhrefの箇所を抜き出す
        for (var index = 0; index < html.length; index++) {
          if(html[index].match('href')) {
            var value = html[index];
          }
        }

        // 抜き出したhtmlの不要な部分を切り取る
        var startQuotes = value.indexOf('"') + 1;
        var endQuotes = value.indexOf('"', startQuotes + 1);
        var canonical = value.substring(startQuotes, endQuotes);

        document.getElementById('canonical').innerHTML = canonical;
      }
    }
  }

  function extractDescription(array) {
    for (var index = 0; index < array.length; index++) {
      // 引数で渡された配列の中から description が属性に設定されているものを探す
      if(array[index].outerHTML.match('"description"')) {
        var html = array[index].outerHTML;
        html = html.split(/ /);

        // htmlからhrefの箇所を抜き出す
        for (var index = 0; index < html.length; index++) {
          if(html[index].match('content')) {
            var value = html[index];
          }
        }

        // 抜き出したhtmlの不要な部分を切り取る
        var startQuotes = value.indexOf('"') + 1;
        var endQuotes = value.indexOf('"', startQuotes + 1);
        var description = value.substring(startQuotes, endQuotes);

        document.getElementById('description').innerHTML = description;
      }
    }
  }

  chrome.tabs.getSelected(null, function(tab) {
    document.getElementById('title').innerHTML = tab.title;
    document.getElementById('url').innerHTML = tab.url;

    var xhr = new XMLHttpRequest();
    xhr.responseType  = "document";

    xhr.onload = function(e){
      var dom = e.target.responseXML;
      var head = dom.head;
      var links = head.querySelectorAll('link');
      extractCanonical(links);

      var metas = head.querySelectorAll('meta');
      extractDescription(metas);

      var noindex = false;
      var nofollow = false;
      for (var index = 0; index < metas.length; index++) {
        if(metas[index].outerHTML.match(/noindex/)) {
          noindex = true;
        }
        if(metas[index].outerHTML.match(/nofollow/)) {
          nofollow = true;
        }
      }
      document.getElementById('noindex').innerHTML = noindex;
      document.getElementById('nofollow').innerHTML = nofollow;

      for (var index = 0; index < links.length; index++) {
        if(links[index].outerHTML.match(/next/)) {
          noindex = true;
        }
        if(metas[index].outerHTML.match(/prev/)) {
          nofollow = true;
        }
      }

    };

    xhr.open("get", tab.url);
    xhr.send();
  });
