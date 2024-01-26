# 統一シフト　開発者向け仕様書

## 0.目的
* 聖光祭におけるシフト入力の効率化及び円滑化

## 1.仕様策定

### 1.最低限満たさなければいけない仕様
* PC（Chromebook）シフトを入力することができる
* PC（Chromebook）で入力したシフトをリアルタイムで閲覧することができる
* CSVファイルのインポート・エクスポートができる（シフト自動生成システムに対応するため）

### 2.できれば満たしたい仕様
* 管理画面を制作し、シフトの追加/削除や権限の付与、その他の管理をGUIで非技術者でも行えるようにする
* シフトの上書きを一定条件下で行うことができる
* シフトをWeb上でスマホ等でも閲覧することができる
* あるフォーマットで印刷をすることができる

### 3.余裕があったら満たしたい仕様
* 聖光祭以外にも使えるシステムにする
* 通知機能・・・とか・・・？

## 2.使用している技術
フロントエンド：Solid.js  
バックエンド：firebase（Hosting,Authentication,Firestore）  

## 3.設計
AtomicDesignなる設計を真似ている。
基本的に完結している一つのコンポーネントをつなげていく形でアプリケーションを表現している。

## ?.ファイル構成

### assets
画像とかを入れるディレクトリ。  
ソースコードを入れてはいけない。  

### css
全体の見た目に関するcss等を置いてあるディレクトリ。  

### firebase
firebase関連の処理をまとめたディレクトリ。  
万が一firebaseをDBにしなくなってもいいように、ここでfirebase関連の処理を隠蔽している。  

### firebase/db
特にdbに関する処理をまとめたディレクトリ。  

### firebase/db/currentOperaingStudent.ts
操作中のユーザーの学籍番号をアカウントのメールアドレスから読み取り、データベースから操作中のユーザーの情報を取得するファイル。  

### firebase/db/displayStudent.ts
現在閲覧している団体の生徒情報を取得するファイル。  

### firebase/db/jobOperateMethods.ts
仕事に関するDB操作がまとまっているファイル。  

### firebase/db/setting.ts
管理者が動的に変更したい生徒に属さない変数を操作するファイル。  
現在はシフト1コマあたりの時間や開始・終了時刻をDBから取得するのが主。  
が、正直動的に操作する必要はないと思う・・・（DB内の配列もすべて変えないといけないため）  
ので、時刻は固定化して仕様ということにして後で消します。
変えたいときはソースコードをいじった方が良さそう。

### firebase/db/studentOperateMethods.ts
生徒に関するDB操作がまとまっているファイル。

### firebase/auth.ts
ログイン、ログアウトの処理と、最初にユーザーがログイン状態か判断するファイル。

### firebase/init.ts
firebaseでしなきゃいけないアプリの初期化をしているだけのファイル。

### logic
コンポーネント内に書きたくないような複雑なロジックを隠蔽するためのディレクトリ。  
~~（ぶっちゃけまだ全然使ってない）~~  

### logic/time.ts
シフト1コマあたりの時間や開始・終了時刻を変更するロジックが書かれたファイル。  
前述の理由で消す可能性大。

### middle
uiほど汎用的じゃないけどある程度まとまってるコンポーネントが入っているファイル。  
ぶっちゃけ名前が意味不明だからセンスある名前に変えたい。

### middle/Toolber
middleのうち、ツールバーに関するものだけをまとめたディレクトリ。

### middle/Toolber/DaySelector.tsx
日付を選べるプルダウンを作っているコンポーネントファイル。

### middle/Toolber/GroupSelector.tsx
グループを選べるプルダウンを作っているコンポーネントファイル。

### middle/Toolber/InputModelSelector.tsx
入力方法（追加/削除）を選べるラジオボタンを作っているコンポーネントファイル。

### middle/Toolber/JobEditor.tsx
入力する仕事内容を選択するモーダルウィンドウを作っているコンポーネントファイル。
まだ中身作ってない。

### middle/Toolber/OperationModeSelector.tsx
今なにをしているのか（閲覧/編集）を選択するプルダウンメニューを作っているコンポーネントファイル。

### page
実際に表示しているページと1:1に対応するコンポーネントをまとめたディレクトリ。

### page/Editer.tsx
実際にシフトを操作する画面になるコンポーネントファイル。
このプロダクトの肝。

### page/Loading.tsx
かっこつけるためだけに青い丸が伸縮するだけの画面になるコンポーネントファイル。

### page/Top.tsx
トップ画面になるコンポーネントファイル。  
一応全世界からアクセスできる画面になるので変なこと書かないようにしよう。

### ui
汎用的なuiになるコンポーネントをまとめたディレクトリ。  
このディレクトリ内のファイルからmiddleやpageからのimportは厳禁（しないとは思うが）。