'use strict'
$(function(){

  var result = '';

  // 文書校正APIに対して通信を行うところ
  //function postYahoo(data) {
    // var contents = data.toString();
    // $.ajax({
    //   url: "https://jlp.yahooapis.jp/KouseiService/V1/kousei",
    //   type:'POST',
    //   dataType:'xml',
    //   ContentType: 'application/x-www-form-urlencoded',
    //   ContentLength: contents.length,
    //   crossDomain: true,
    //   data: {
    //     appid: '******************',
    //     no_filter: '12',
    //     sentence: contents
    //   },
    //   TODO：thenで書き換える
    //   success:function(xml){
    //     $(xml).find("Result").each(function() {
    //       if ($(this).find('ShitekiWord').text()) {
    //         $("#text").append(
    //           '<ul class="layout-bottom-small">' +
    //             '<li>先頭文字列から「' + $(this).find('StartPos').text() + '」文字目</li>' +
    //             '<li>対象表記「' + $(this).find('Surface').text() + '」</li>' +
    //             '<li>言い換え候補文字列「' + $(this).find('ShitekiWord').text() + '」</li>' +
    //             '<li>指摘詳細「' + $(this).find('ShitekiInfo').text() + '」</li>' +
    //           '</ul>'
    //         );
    //       }
    //     });
    //   },
    //   error:function(xml) {
    //     //console.log(xml);
    //     //console.log(typeof xml);
    //     //console.log(xml["responseText"]);
    //     //console.log(typeof xml["responseText"]);
    //     //alert("ロード失敗");
    //   }
    // })
  //}

  // 取得するタブの条件
  var queryInfo = {
    active: true,
    windowId: chrome.windows.WINDOW_ID_CURRENT
  };

  // 値が有無を判断する
  function checkValue(selector) {
  }

  // タブの情報を取得する
  chrome.tabs.query(queryInfo, function (result) {
    // 配列の先頭に現在タブの情報が入っている
    var currentTab = result.shift();

    $('#url').html(currentTab.url);

    chrome.tabs.sendMessage(currentTab.id, 'callContentScript', function(response) {
      // postYahoo(response.data.document);

      // title
      $('#title').html(response.data.title);
      $('#title-count').html($('#title').text().length);

      // 文字数によって背景色を変更する 30~50以内ならok、それ以外は黄色
      var titleCount = $('#title').text().length;
      if(30 > titleCount || 50 < titleCount) {
        $('#title').prev().addClass('is-note');
        $('#title').addClass('is-note');
      }

      // canonical
      if(response.data.canonical) {
        $('#canonical').html(response.data.canonical);
        if (currentTab.url.match(response.data.canonical)) {
          $('#canonical').prev().addClass('is-note');
          $('#canonical').addClass('is-note');
        } else {
          $('#canonical').prev().addClass('is-warning');
          $('#canonical').addClass('is-warning');
        }
        $('#canonical-state').text('担当者に確認してください。');
      } else {
        $('#canonical-state').text('問題ありません');
      }

      // description
      if(response.data.description) {
        $('#description').html(response.data.description);
        $('#description-count').html($('#description').text().length);

        // 文字数によって背景色を変更する 70~120以内ならok、それ以外は黄色
        if(70 > $('#description').text().length || 120 < $('#description').text().length) {
          $('#description').prev().addClass('is-note');
          $('#description').addClass('is-note');
        }
      } else {
        $('#description').prev().addClass('is-warning');
        $('#description').addClass('is-warning');
        $('#description').text('値がありません。担当者に確認してください。');
      }

      // noindex,nofollow
      if(response.data.robots) {
        if((response.data.robots).match(/noindex/)) {
          $('#noindex').html('記述あり');
          $('#noindex-state').html('担当者に確認してください。');
          $('#noindex').prev().addClass('is-warning');
          $('#noindex').addClass('is-warning');
        } else {
          $('#noindex').html('記述なし');
          $('#noindex-state').text('問題ありません');
        }

        if((response.data.robots).match(/nofollow/)) {
          $('#nofollow').html('記述あり');
          $('#nofollow-state').html('担当者に確認してください。');
          $('#nofollow').prev().addClass('is-warning');
          $('#nofollow').addClass('is-warning');
        } else {
          $('#nofollow').html('記述なし');
          $('#nofollow-state').text('問題ありません');
        }
      } else {
        $('#noindex').html('記述なし');
        $('#nofollow').html('記述なし');
        $('#noindex-state').text('問題ありません');
        $('#nofollow-state').text('問題ありません');
      }

      // next. prevタグ
      if (response.data.next) {
        $('#next').html(response.data.next);
        $('#next-state').html('値が表示されている場合削除してください。');
        $('#next').prev().addClass('is-note');
        $('#next').addClass('is-note');
      } else {
        $('#next').html('記述なし');
        $('#next-state').html('問題ありません');
      }

      if (response.data.prev) {
        $('#prev').html(response.data.prev);
        $('#prev-state').html('値が表示されている場合削除してください。');
        $('#prev').prev().addClass('is-note');
        $('#prev').addClass('is-note');
      } else {
        $('#prev').html('記述なし');
        $('#prev-state').html('問題ありません');
      }


      // hタグ
      $('#head-01').html(response.data.h1);

      for (var i = 0; i < response.data.h2.length; i++) {
        var listItem = response.data.h2[i];
        $('#head-02').append(`<li>${ listItem }</li>`);
      }

      for (var i = 0; i < response.data.h3.length; i++) {
        var listItem = response.data.h3[i];
        $('#head-03').append(`<li>${ listItem }</li>`);
      }

      for (var i = 0; i < response.data.h4.length; i++) {
        var listItem = response.data.h4[i];
        $('#head-04').append(`<li>${ listItem }</li>`);
      }
    })
  })

  // popupが開かれた時にbackground.jsに開かれたことを送信、コールバックでhtmlに差し込み
  chrome.runtime.sendMessage('callBackground', function(response) {
    if (response.url != $('#url').text()) {
      $('#x-robots-tag').prev().addClass('is-warning');
      $('#x-robots-tag').addClass('is-warning');
      $('#xRobotsTag-state').text('更新してください');
    } else {
      $('#x-robots-tag').html(response.message);
      // x-robots-tagの値があった場合
      if (response.message) {
        $('#x-robots-tag').prev().addClass('is-warning');
        $('#x-robots-tag').addClass('is-warning');
        $('#xRobotsTag-state').text('担当者に確認してください。');
      }
    }
  })

  //tabの制御
  $('.tab-label').on('click', function(){
    var currentTab = $(this).index();
    $(".tab-label").removeClass("active");
    $(".panel").removeClass("active");
    $(this).addClass("active");
    $(".panel").eq(currentTab).addClass("active");
  });
});
