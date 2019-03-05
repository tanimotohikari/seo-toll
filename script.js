var titles = document.getElementsByTagName('title')

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request == 'callContentScript') {
      console.log(titles)
      sendResponse({ message: titles[0].text });
    }
  }
);