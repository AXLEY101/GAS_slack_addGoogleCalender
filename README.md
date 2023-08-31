# GAS_slack_addGoogleCalender
## こちらのファイルはGoogleAppScript　Googleカレンダー　SlackのIncoming Webhookの利用を前提として記述しております。

<h3>セットアップ</h3>
<p>GoogleAppScriptのサービスからGoogleCalenderAPIを設定し有効にしてください。</p>
<p>SlackのIncomingWebhookを利用してチャンネルにメッセージを送るので、まずはそちらの設定を行います。</p>
<p>こちらのホームページでSlackのURLの作成方法が詳しく乗っておりますので参考にしてください。</p>
<p>https://documents.trocco.io/docs/how-to-generate-slack-webhook-url</p>
<p></p>
<p>googleドライブの新規作成から、GoogleAppScript（以下GAS）を選び新しいGASを作成してください。</p>
<p>作成しましたら、スクリプトに「gasを使ったGoogleCalenderの予定をslackに送るスクリプト.gs」に書かれているスクリプトをコピーしてください。</p>
<p>var webhookUrl = 'incoming Webhookで作ったチャンネルのURLをここに記載してください。'; の部分を自分で取得したＵＲＬに変更すれば動きます。</p>
<p>あとは、カレンダーのトリガーからGoogleカレンダーの予定を引き出す時間帯を自由に設定してください。 sendEventsToSlackを指定すれば動きます。　初回のみ、権限の付与が必要になります。</p>
<h3>対象のカレンダーを変更したい場合は</h3>
<p>var calendarId = 'primary';</p>
<p>の部分のprimaryを変更したいカレンダーIDに変えてあげるとそちらのカレンダーから呼び出します。</p>
<h3>対象とする日時を変更したい場合は</h3>
<p>変数のstartOfDayとendOfDayで対象とする範囲をしていしておりますが、ここを変更することで、一週間分を一気に取得することもできます。</p>
<h3>メッセージ内容やSlackに表示されるアイコンなどを変更したい場合は</h3>
<p>var payload = {}の中身を編集してください。コメントアウトで説明しておりますので参照してください。</p>
