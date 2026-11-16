# AGENTS.md

這是我自己的 CPE / UVa / LeetCode 刷題筆記網站。
之後我會直接丟題號或程式碼給你，請照下面的規矩幫我生出新的筆記頁面，並掛到首頁上，不要每次都重新設計排版。

## 專案結構
整個網站用純靜態 HTML + CSS + JS 寫，不裝任何前端框架或打包工具，因為我要直接丟 GitHub Pages 跑。

- `index.html`：首頁。文章卡片是靠 JS 讀 `data/articles.json` 生出來的，不要在這裡手動塞 HTML。
- `assets/style.css`：全站樣式，顏色跟字體都已經寫好 CSS 變數了，直接用就好。
- `assets/app.js`：負責讀 JSON 跟做首頁的分類篩選。
- `data/articles.json`：全站文章清單。
- `posts/`：所有解題筆記都放這。
  - `posts/template.html` 是空白公版，**不能刪**，每次加新文章都從這份複製。

## 檔名跟路徑規矩
新增筆記的時候，HTML 檔案一律丟在 `posts/` 底下，檔名全部小寫、用 `-` 隔開，格式照這樣取：
`平台-題號-英文簡稱.html`
（例如：`uva-10035-primary-arithmetic.html` 或 `leetcode-1-two-sum.html`）

## 寫作跟程式碼風格（很重要）
1. **不要寫得像官方題解**：解題想法用第一人稱「我」來寫，語氣像平常在寫自己的筆記或跟同學討論一樣，直接講重點就好，不要加一堆沒營養的開場白或總結。
2. **程式碼風格**：
   - C++ 程式碼統一用 `<pre><code class="language-cpp">...</code></pre>` 包起來，記得把 `<` 跟 `>` 轉成 `&lt;` 和 `&gt;`。
   - **程式碼寫法要照我的習慣**：不要用三元運算子（`? :`）、不要寫 lambda、也不要把簡單邏輯拆成一堆零碎的 helper function，直接把判斷式（`if / else`）清楚寫在 `main()` 裡面就好。變數命名簡潔明瞭，重點地方加一兩行中文註解即可。
3. **樣式限制**：不要在 HTML 裡面寫行內樣式（`style="..."`），一律吃 `style.css` 裡的 class 跟變數。

## 新增一篇筆記的流程
每次我請你「新增一題筆記」時，請照順序做完這幾件事：

1. **建新頁面**：複製 `posts/template.html` 到 `posts/` 底下並改好檔名。改掉 `<title>`，然後把內文填進這四個固定區塊（都用 `<h2>`）：
   - `題目在問什麼`：用白話文講清楚輸入輸出跟要算什麼，不用貼整段英文題目。
   - `解題思路`：記錄這題要用什麼資料結構或演算法（例如用 `unordered_map` 還是 `priority_queue`），順便寫一下時間複雜度。
   - `C++ 程式碼`：放可以 AC 的完整程式碼。
   - `易錯點`：記一下哪裡容易吃 WA 或 TLE（像是測資結束條件、沒開 `long long` 之類的）。

2. **更新清單**：打開 `data/articles.json`，把這篇的資料加在陣列的**最前面**，這樣首頁最新寫的才會排第一個：
   ```json
   {
     "id": "uva-10035",
     "title": "UVa 10035 - Primary Arithmetic",
     "category": "模擬",
     "difficulty": "CPE 1顆星",
     "date": "2026-11-17",
     "path": "posts/uva-10035-primary-arithmetic.html",
     "summary": "模擬直式加法算進位幾次，注意終止條件是兩個 0。"
   }