# rotating-triangle

## GitHub Pagesへの公開フロー
1. Viteプロジェクトを作成

    ```pgsql
    .
    ├─ src/
    ├─ index.html
    ├─ vite.config.ts
    ├─ package.json
    └─ tsconfig.json
    ```

1. ビルド
    開発モード
    ```bash
    npm run dev
    ```
    → ブラウザが自動で開いてCanvasが回転します。
    （変更も即反映）

    ビルド（GitHub Pages用）
    ```bash
    npm run build
    ```
    → dist/ に成果物が出力されます。

1. GitHub Pagesへの設定
    1. GitHubリポジトリを開く
    1. `Settings → Pages`に進む
    1. 「Source」を「GitHub Actions」に設定

    ※「`Deploy from a branch`」では`\dist`を指定できない
    [†](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)．

1. 自動ビルド用ワークフロー追加
    `.github/workflows/deploy.yml`を作成

1. コミット＆Push

    ```bash
    git add .
    git commit -m "Add GitHub Pages deploy workflow"
    git push origin main
    ```
    GitHubにPushすると自動的に以下が実行される：
    1. `npm ci`
    1. `npm run build`
    1. `dist`の中身を自動でPagesに公開

    もし初めてのPushであれば：
    ```bash
    git add .
    git commit -m "init"
    git branch -M main
    git remote add origin https://github.com/<username>/<repo>.git
    git push -u origin main
    ```

1. 公開確認
    1. `Actions`タブで`Deploy to GiHub Pages`の完了を確認
    1. 数分後，`Settings → GitHub Pages`にURLが表示：

    ```
    https://<username>.github.io/<repository-name>/
    ```