# 橘子蘋果官網 Footer 改版提案

這是橘子蘋果程式學苑官網 Footer 的獨立互動原型，供內部討論資訊架構、視覺設計與轉換動線使用。

## 線上預覽

**[開啟 Footer 互動原型](https://poshlin.github.io/oa-footer-prototype/)** ← 以此為準

推送到 `main` 後由 GitHub Actions 自動建置並部署，網址不變。
內部提案頁，已設 `noindex` 與 `robots.txt`，不希望被搜尋引擎收錄。

<details>
<summary>部署是怎麼運作的</summary>

這個原型是 SSR（vinext + Cloudflare Workers），而 GitHub Pages 只吃靜態檔，所以流程多兩步：

1. `PAGES_BASE=/oa-footer-prototype/ npm run build` — Pages 的專案站掛在子路徑底下，
   資源路徑要帶前綴才載得到。不設這個變數時 `base` 為 `/`。
2. `node build/prerender.mjs` — 把 SSR 的首頁預先渲染成 `dist/client/index.html`。
   新增頁面時要把路徑加進該檔的 `ROUTES`。
3. `dist/client` 整包上傳為 Pages artifact。

設定在 `.github/workflows/pages.yml`。

另有一個舊的 OpenAI Sites 預覽站（`orangeapple-footer-prototype.poshlin.chatgpt.site`），
它走自己的部署流程，**push 到 GitHub 不會更新它**，且不設 `PAGES_BASE` 所以路徑維持根目錄。
兩條路互不影響，但內容會分歧，以 GitHub Pages 這條為準。
</details>

## 本版重點

- LINE 僅保留一個主要諮詢入口，避免與社群圖示重複。
- 課程導覽依家長決策需求整理，而不是放入所有網站頁面。
- 家長專區集中諮詢、據點、FAQ、選課指南、學員作品與登入。
- 品牌區集中關於橘蘋、內容觀點、社會責任、合作與招募。
- 桌機固定展開三欄，手機改為可展開、收合的分類導覽。
- 電話與 LINE 都是明確的行動按鈕，手機可直接撥號或開啟 LINE。
- 客服服務時間以實體／線上雙卡片呈現，手機改為 Bottom Sheet。
- 支援鍵盤操作、清楚焦點狀態、48px 以上觸控區與減少動態效果偏好。

## 討論時建議聚焦

1. 三組分類是否符合家長找資料的順序。
2. 哪些連結應作為全站長期入口，而不是短期活動頁。
3. LINE 諮詢與電話的主次是否符合實際客服策略。
4. 是否採用「全台 12 縣市直營｜線上課程不限地區」作為長期信任訊號。

## 本機預覽

需要 Node.js 22.13 以上版本。

```bash
npm install
npm run dev
```

正式建置檢查：

```bash
npm run build
```

主要頁面位於 `app/page.tsx`，樣式位於 `app/globals.css`。
