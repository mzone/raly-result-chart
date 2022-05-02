# Rally Result Chart

## 開発

Backend側とFrontend側の両方のサーバーを起動させることでページを表示します。

## スタートガイド

### 1, エントラント、SSデータファイルの追加

entrant.csv、specialStages.csv をそれぞれ作成する。

- エントラントCSVデータ `data/ {$大会名} /entrant.csv`
- SSのCSVデータ `data/ {$大会名} /specialStages.csv`



ゼッケン番号、クラス名、ドライバー名、コ・ドライバー名、社名、車両型式、車両区分、チーム名

```csv
entrant.csv

1,JN-1,福永 修,齊田 美早子,アサヒ☆カナックＯＳＡＭＵ５５５ファビア,ABCUFX11,Ｒ,THREE FIVE MOTORSPORT
2,JN-1,柳澤 宏至,保井 隆宏,ADVAN CUSCO FABIA R5,ABCUFX11,Ｒ,CUSCO RACING
3,JN-1,新井 敏弘,田中 直哉,富士スバル　ＡＭＳ　ＷＲＸ　ＳＴＩ,CBA-VAB改,Ｒ,SUBARU　TEAM　ARAI
```



DAY、SS No、SS名、距離（km）
```csv
specialStages.csv

1,1,Tsunotsuki 1,12.62
1,2,Narial 1,13.19
2,6,HACHIMAN 1,6.07
2,7,BIZAN REVERSE 1,6.87
```

### 2, リザルトデータの取得

バックエンドサーバーを起動させ、PHPのスクレイパーを実行する

```sh
cd ./backend
php -S localhost:8888
```

URL
`http://localhost:8888/api/results/make-files.php?key=1` にアクセス (key=1は呪文)
アクセスすると今は、久万高原ラリー2022 のSS1からSS8までのデータが以下に保存されます。

- /data/kuma2022/SS1.json
- /data/kuma2022/SS2.json
- ...
- /data/kuma2022/SS9.json
- /data/kuma2022/SS10.json

### 3, フロントエンドサーバーの起動（node）

```sh
cd ./frontend
yarn && yarn dev
```
5, http://localhost:3000 へアクセス
