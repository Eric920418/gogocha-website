# GoGoCha 花蓮計程車 — 品牌官方網站

> 花蓮在地 24h 計程車隊的品牌官網。Next.js 16 + Tailwind 4 + Vercel。

---

## 專案定位

- **品牌**：GoGoCha（花蓮計程車）
- **服務範圍**：台灣花蓮縣 13 鄉鎮市
- **語言**：繁體中文（zh-TW only，**不做 i18n**）
- **目標**：乘客叫車轉換 + 司機招募 + B2B 合作詢價

## 技術棧

| 類別 | 工具 |
|------|------|
| Framework | Next.js 16 App Router + React 19 |
| 樣式 | Tailwind CSS 4（`@theme` tokens） |
| UI 元件 | 自寫 + Radix UI primitives |
| 表單寄信 | Resend |
| Schema | Zod |
| 字體 | Noto Sans TC（next/font/google） |
| 動畫 | Framer Motion（少量） |
| Toast | Sonner |
| 部署 | Vercel |
| 套件管理 | **pnpm（強制）** |

## 設計原則

1. **聚焦勝過完整** — 三個受眾各只主打 3-4 個賣點，不做功能 dump
2. **長輩友善 + 現代感平衡** — 18px 內文 / 大按鈕 / 允許縮放 / A-/A+ 切換 / WCAG AAA
3. **公開內容有依據** — 車資以官方公告摘要呈現，來源、查核日期與生效日分開標示。
4. **計費分離** — 官網暫停數值車資試算，不呼叫計費 API；後端與 Android 計費另案核對。

## 頁面結構（9 頁）

| 路徑 | 內容 |
|------|------|
| `/` | 電話／LINE 叫車、AI 接聽介紹、接送準備事項、車資說明入口、服務區域 |
| `/passenger` | 預約流程、行李／輪椅／付款確認、Android 下載與 iPhone 使用者 LINE 入口 |
| `/driver` | 司機招募、收入情境試算與申請表單 |
| `/pricing` | 官方費率摘要、來源、查核日期、2027 新制與費率 FAQ；無數值車資試算 |
| `/routes` | 10 條接送路線的會合、行李、回程提醒；原 slug 保留為段落錨點；無估價 |
| `/faq` | 六類常見問題，原生 `<details>`，可見問答與 JSON-LD 一致 |
| `/about` | 服務介紹及需提前確認的服務區域，不使用佔位故事、年資或推薦 |
| `/contact` | 一般／B2B／客訴聯絡表單 |
| `/privacy` | 隱私政策 |

`/terms` 尚未建立，footer 不放連結；沒有 iOS 預約頁，iPhone 使用者改導向 LINE 洽詢。

## 開發

### 安裝

```bash
pnpm install
```

### 啟動 dev server

```bash
pnpm dev
```

打開 [http://localhost:3000](http://localhost:3000)。

### 型別檢查

```bash
pnpm exec tsc --noEmit
```

### Production build

```bash
pnpm build && pnpm start
```

## 環境變數

複製 `.env.example` 為 `.env.local` 並填入：

### Public（client 可讀）

| Key | 用途 |
|-----|------|
| `NEXT_PUBLIC_API_BASE` | 後端 API base URL（預設：`https://api.hualientaxi.taxi`） |
| `NEXT_PUBLIC_SITE_URL` | 網站正式 URL（影響 canonical / OG / sitemap / JSON-LD / llms.txt） |
| `NEXT_PUBLIC_PLAY_STORE_URL` | Google Play 連結 |
| `NEXT_PUBLIC_PHONE` | 正規電話：E.164 國際格式（含國碼 `+886`）。供 JSON-LD／llms.txt 等機器讀取（Google 建議格式）。**`tel:` 撥號連結不直接用它**——`lib/site.ts` 的 `toLocalDial()` 自動衍生 `site.phoneDial`（去 `+886`、補回前導 `0`，例：`+88638907320` → `038907320`），因手機端撥 `tel:+886` 市話常被當國際碼卡住撥不出 |
| `NEXT_PUBLIC_PHONE_DISPLAY` | 顯示用號碼（含 dash） |
| `NEXT_PUBLIC_LINE_OA_URL` | LINE 官方帳號網址 |
| `NEXT_PUBLIC_GA_ID` | 預留 GA4 ID；目前未載入追蹤程式，不代表已完成轉換追蹤 |

### Server only（**禁止洩漏到 client**）

| Key | 用途 |
|-----|------|
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM_DOMAIN` | 寄件 domain（需在 Resend 驗證） |
| `CONTACT_TO_EMAIL` | 一般聯絡收件 |
| `DRIVER_APPLY_TO_EMAIL` | 司機申請收件 |
| `B2B_TO_EMAIL` | B2B 詢價收件 |

> **dev 模式**：若 `RESEND_API_KEY` 未設定，API route 會 log payload 並回 `{ok:true,devMode:true}`，方便本地測試表單流程。

## API 整合

### 既有 Server 端 public API

以下為既有 API 工具層，目前首頁與車資頁均未使用：

- `GET /api/config/fare` — 舊版車資費率配置工具（目前未使用）
- `POST /api/config/fare/calculate` — 舊版試算器工具（目前未掛載）

**回應格式**：`{ success: true, data: {...} }` envelope。處理見 `lib/api/schemas.ts`。

### 自家 API routes

- `POST /api/contact` — 聯絡表單 → Resend
- `POST /api/driver-apply` — 司機申請 → Resend

### P1 階段要在 server 補

- `POST /api/public/contact`、`POST /api/public/driver-apply`、`POST /api/public/b2b-inquiry`
- `GET /api/public/stats`、`GET /api/public/landmarks/hot`

完成後把 client form 從 Resend 切換到 server endpoint。

## 部署到 Vercel

### 1. 推到 Git repository

```bash
git add . && git commit -m "init: gogocha website P0"
git remote add origin <your-repo>
git push -u origin main
```

### 2. Vercel Project Setup

- 連結 Git repo
- Framework Preset: **Next.js**（自動偵測）
- Build Command: `pnpm build`（自動）
- Output Directory: `.next`（自動）

### 3. 環境變數

把 `.env.local` 內容複製到 Vercel Project Settings → Environment Variables，**Production / Preview / Development** 三個都設定。

**重要**：
- `NEXT_PUBLIC_SITE_URL` **必須**設為正式網址 `https://hualientaxi.taxi`（影響 canonical / sitemap / JSON-LD / llms.txt 全部 URL）。未設時用 `lib/site.ts` 的 fallback（已是 hualientaxi.taxi）；本地 `.env.local` 的 `http://localhost:3000` 僅供開發，**勿帶到 production**。
- `RESEND_API_KEY` 必須設定（否則 API 在 production 會回 503）
- `RESEND_FROM_DOMAIN` 必須在 Resend 完成 DNS 驗證

### 4. 自訂網域

在 Vercel Settings → Domains 加入 `hualientaxi.taxi`，按指示設定 DNS。`next.config.ts` 已設 `www → apex` 永久重導（Next.js 回傳 308）。

## SEO／GEO 架構（2026-09-27）

- `lib/seo/pages.ts` 集中九頁的名稱、標題及摘要；每頁透過 `pageMetadata` 輸出自身 canonical、Open Graph、Twitter。sitemap 與 llms.txt 共用頁面清單。
- `app/opengraph-image.tsx` 提供全站品牌分享圖，移除假評分、接送數與秒數承諾。子頁 metadata 明確指定分享圖，避免覆蓋父層 Open Graph 後遺失圖片。
- `lib/seo/jsonld.ts` 保留現有 JSON-LD builder：營運組織固定 `/#organization`，`TaxiService` 固定 `/#taxi-service` 並以 `provider` 指向組織。不放未核實店址、市中心座標、LocalBusiness、自評或 aggregateRating。
- 八個子頁都有 `BreadcrumbList`；`/faq`、`/pricing`、`/routes` 的 `FAQPage` 使用畫面實際顯示的相同問答。一般商家不以取得 Google FAQ 富摘要為目標，也不保證 AI 引用。
- `content/faqs.ts`、`content/routes.ts`、`lib/site.ts` 是問答、路線與聯絡／服務區域資料來源；llms.txt 由這些既有資料產生，不另外維護報價。
- 路線保留原 slug 作為 `/routes#slug` 錨點。機場與車站接送優先，山區路線附太魯閣官方開放資訊；不保證遊憩據點可通行。
- robots 保留公開頁可抓取、排除 `/api/`；sitemap 不填沒有可靠來源的 `lastModified`。
- 未核實評分、趟數、年資、旅客及飯店推薦已撤下，推薦資料為空。取得可公開來源與授權後才恢復，不建立造假門檻或虛構來源。
- 不新增鄉鎮堆字頁、特殊 AI schema 或 SEO 套件。Google AI 搜尋仍依一般 SEO 基礎，不要求 llms.txt：[官方說明](https://developers.google.com/search/docs/appearance/ai-features)。

### 車資資料來源與適用期間

`content/fare-policy.ts` 只供官網公告摘要與 FAQ 使用，**不是計價引擎**。資料查核日為 2026-09-27，內容異動需人工重新核實並更新查核日。

- [現行運價公告（PDF）](https://ws.hl.gov.tw/Download.ashx?icon=..pdf&n=MDA5MjIwOTAucGRm&u=LzAwMS9VcGxvYWQvNTExL3JlbGZpbGUvMjE1NDgvMTQwNDQ4L2I4NjRmNTgxLTBlMDUtNDE4Zi1iOWViLWUwNTFjZjUxYjRhMi5wZGY%3D)：日間起程 1,000 公尺 NT$100、續程 230 公尺 NT$5，低速每 2 分鐘 NT$5；夜間 22:00–06:00 改按起程 834 公尺、續程 192 公尺及低速每 1 分 40 秒計費。
- [2027 年運價調整公告](https://iapc.hl.gov.tw/News_Content.aspx?n=30681&s=230183&sms=24976)：2027-01-01 起程調整 NT$120，未完成改表仍依原標準。官網將新制分段呈現，不提前套用。
- 春節實施日期需每年核對公告，不能固定寫成除夕至初五。預約費、付款方式、輪椅車與偏遠地區派車需事先確認，不宣稱全車隊一定支援。
- 舊的 `lib/api/fare.ts`、車資試算與對照表元件仍保留但未掛載；其中 fallback 與官方規則有差異，**不得直接重新啟用**。後端、Android、時區及春節計價須另案一起校正；本次未改 API、App 或資料庫。

### 驗證方式

```bash
pnpm lint
pnpm exec tsc --noEmit
NEXT_PUBLIC_SITE_URL=https://hualientaxi.taxi pnpm build
NEXT_PUBLIC_SITE_URL=https://hualientaxi.taxi pnpm start --hostname 127.0.0.1 --port 3100
# 另開終端：Python 3 標準函式庫，無額外依賴
pnpm seo:check http://127.0.0.1:3100 https://hualientaxi.taxi
```

腳本驗證九頁 HTTP、唯一 title/description、canonical、OG/Twitter、圖片、JSON-LD 實體與麵包屑、FAQ 與可見文字一致、站內連結／錨點、sitemap、robots、llms.txt，以及舊報價／佔位宣稱未殘留。失敗時顯示完整例外並回傳非零狀態。

首頁／車資頁載入的 client bundles 也檢查不得含 `/api/config/fare` 請求程式碼。

手機版需另外確認電話／LINE href、FAQ 展開、路線錨點、分享圖及橫向溢出，並確認首頁與 `/pricing` 不呼叫計費 API。測試不送出表單、不實際撥電話或傳送 LINE 訊息。

### 本次驗證結果

- production build、TypeScript 與九頁 SEO 檢查通過。
- 390px 手機檢查：首頁、車資與路線頁無橫向溢出，電話／LINE 連結正確，FAQ 可展開，路線錨點定位正常。
- 1200×630 分享圖片已實際檢視，中文、電話與 LINE 可讀，無佔位評分或趟數。

### 已知驗證限制與後續

- 全站 lint 既有四個錯誤：`ContactForm`、`FontSizeToggle` 的 `react-hooks/set-state-in-effect`，以及 `input`／`textarea` 的空 interface。這些檔案的既有行為未在本次 SEO 工作中調整；另有三個原有 warning。
- 本次不自動部署、不提交 Search Console 或修改 Google 商家檔案。部署後提交 sitemap，按實際收錄與叫車相關查詢的曝光／點擊觀察變化；無法保證排名或 AI 引用。
- 真實營運資料、司機合作費率／收入情境假設、保險與隱私政策仍需負責人確認；本次不替未提供依據的業務政策背書。

## 與 Android App 的關聯

- **品牌色**：`app/globals.css` 的 `--color-taxi-yellow` 等對齊 `ui/theme/Color.kt`
- **Logo**：`public/logo.png` 直接複製自 `res/drawable/ic_launcher_foreground.png`
- **Hero 背景**：`public/splash-hero.jpg` 複製自 `res/drawable-nodpi/splash_cover.jpg`
- **歷史計費工具**：`lib/api/fare.ts` 原參照 `utils/FareCalculator.kt`，已知與官方規則不符，官網不再使用；跨端修正另案處理
- **隱私政策文案**：`app/privacy/page.tsx` 從 `PassengerSettingsScreen.kt:537-609` 遷移改寫

## 維護注意事項

1. 文件只更新本 README.md；不另建 `.md`，禁止使用任何 `accept-data-loss` 指令。
2. 只用 pnpm 安裝套件；所有對外表單錯誤保留前端完整顯示，不更動寄信 API。
3. 新增頁面同步更新 `lib/seo/pages.ts`、頁面 metadata、麵包屑與可到達的導覽；sitemap 和 llms.txt 由頁面清單產生。
4. 服務區域、電話與 LINE 改 `lib/site.ts`；問答改 `content/faqs.ts`；接送注意事項改 `content/routes.ts`。更新時一起檢查可見內容與 JSON-LD／llms.txt。
5. 公告摘要改 `content/fare-policy.ts`，核實來源、適用日期與查核日；不把官網摘要當後端計費設定。
6. AI 接電話與 App 語音輸入是不同功能；對外只說服務與操作，不揭露後端廠商、並發門檻或 SIP 號碼。不刊登沒有量測依據的接通率、派車秒數、評分或趟數。
