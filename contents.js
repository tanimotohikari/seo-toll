window.onload = function () {
  let links = document.getElementsByTagName('link');
  let canonical = document.getElementById('canonical');

  console.log('hoge');
  for (var i = 0; i < links.length; i++) {
    if (links[i].rel) {
      if (links[i].rel.toLowerCase() == "canonical") {
        canonical.innerHTML = links[i].href;
      }
    }
  }
  canonical.innerHTML = 'なし';
}
