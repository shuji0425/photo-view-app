# アプリ名

写真一覧アプリ

## アプリ概要

表示が早い写真アプリを作りたいと思ったのがきっかけ。

## 使用言語

- TypeScript(Next.js): ver.latest
- Go(Gin):ver.latest
- Docker
- DB(MySQL): ver.5.7

## 補足

PC スペック上起動は SH コマンドを使用

Xserver を使用するため、画像は images にて管理。

DB と phpmyadmin は Docker を使用する。

# 環境構築

```bash
# クローン
git clone https://github.com/shuji0425/photo-view-app.git

# npm インストール
cd frontend & npm install

# 権限付与
chmod +x start.sh

# アプリ実行
./start.sh
```

# 権限付与

```bash
chmod +x start.sh
```
