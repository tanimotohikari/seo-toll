function getDoms() {
  var title = $('title').text();
  var description = $('meta[name="description"]').attr('content');
  var canonical = $('link[rel="canonical"]').attr('href');
  var html = document.body.innerText;
  var htmlDom = document.body.innerHTML;
  var htmlTags = [];
  var pattern = /h[1-6]>*?/;
  var h1 = $('h1').text();
  var h2Strings = [];
  var h2Length = $('h2').length;
  var h3Strings = [];
  var h3Length = $('h3').length;
  var h4Strings = [];
  var h4Length = $('h4').length;
  var next = $('link[rel="next"]').attr('href');
  var prev = $('link[rel="prev"]').attr('href');
  var robots = $('meta[name="robots"]').attr('content');

  // hタグのテキストを配列に格納する
  for (var i = 0; i < h2Length; i++) {
    h2Strings.push($('h2').eq(i).text());
  }

  for (var i = 0; i < h3Length; i++) {
    h3Strings.push($('h3').eq(i).text());
  }

  for (var i = 0; i < h4Length; i++) {
    h4Strings.push($('h4').eq(i).text());
  }

  data = {
    title: title,
    description: description,
    document: html,
    canonical: canonical,
    h1: h1,
    h2: h2Strings,
    h3: h3Strings,
    h4: h4Strings,
    next: next,
    prev: prev,
    robots: robots
  }
  return data;
}

chrome.runtime.onMessage.addListener (
  function(request, sender, sendResponse) {
    if (request == 'callContentScript') {
      data = getDoms();
      sendResponse({ data });
    }
  }
);

chrome.runtime.sendMessage ('',
  function(data) {
    //console.log("message sent");
  }
);
