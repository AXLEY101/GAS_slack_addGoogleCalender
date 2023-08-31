//　自動で動かないようにトリガーは設定していません。　お好きなトリガーでsendEventsToSlackを呼び出してください。
function sendEventsToSlack() {
  // Google カレンダーのIDを指定（'primary'は主要なカレンダーを指す設定開いた時に、自分のメールアドレスになってるもの　ここのIDを変更する事で、別カレンダーから引っ張る事もできます。）
  var calendarId = 'primary';
  
  // 今日の日付を取得
  var today = new Date();


  // 今日の0時0分0秒を取得
  var startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  // 今日の23時59分59秒を取得
  var endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  
  // カレンダーから今日の予定を全部取得
  var events = Calendar.Events.list(calendarId, {
    timeMin: startOfDay.toISOString(),
    timeMax: endOfDay.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    
  });
  
  // イベントがあればSlackに通知
  if (events.items && events.items.length > 0) {
    for (var i = 0; i < events.items.length; i++) {
      var event = events.items[i];
      var start = new Date(event.start.dateTime || event.start.date);
      var message = Utilities.formatDate(start, "JST", "yyyy/MM/dd HH:mm") + ' - ' + event.summary;
      sendToSlack(message);
    }
  } else {
    Logger.log('スケジュールはありません。');
  }
}

function sendToSlack(message) {
  // SlackのIncoming WebhookのURLを入力してください。
  var webhookUrl = 'incoming Webhookで作ったチャンネルのURLをここに記載してください。';

  // 送信するメッセージを設定
  var payload = {
    "text": message + 'testメッセージ',//　ここのmessageがgoogleカレンダーに記載されている部分。　＋で追記すれば好きな文字列を突っ込むことができます。　カレンダー記載の身にしたい場合は＋以降を消してください。
    "username": "test",
    "icon_emoji": ":calendar:",// icon_emojiが動いていないのは::で挟んでいないからかもしれません。　これが抜けると文字列を絵文字と認識できなくなるようです。
    // もし外部URLのアイコンを使いたい場合 URLお好きに合わせてください。
    // "icon_url": "https://example.com/path/to/icon.png"
  };
  
  // POSTリクエストのオプションを設定
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    //　↑3つはslackに送る際の定型文に近くなってるみたいです。　他のオプションを見つけたので載せておきます。
    // "headers":   リクエストに追加するＨＴＴＰヘッダーをオブジェクト形式で指定できるようです。
    // "muteHttpExceptions":true, trueにするとＨＴＴＰエラーが出てもthrowメソッドを動かさないようにします。 開発用で、テスト試行の際使用されるものだと思われます。
    "followRedirect": true,//　デフォルトでtrueになってます。　falseにすることでredirect()を動かしません。（強制的な画面遷移をストップします。これも基本trueでＯＫです。）
    "validateHttpsCertificates": true,//デフォルトでtrueになってます。 trueだとHTTPS接続の際にSSL証明書の検証を行います。（もしも、工場などの外部に接続しない社内のみのネットワークで通信を行う際、HTTPが採用されることがありますがそのための設定だと思われます。　外部ネットワークに繋ぐならtrue安定です。）

  };
  
  // Slackにメッセージを送信
  UrlFetchApp.fetch(webhookUrl, options);
}
