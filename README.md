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
3. **真實 API 串接** — 車資試算器直接打 `https://api.hualientaxi.taxi/api/config/fare/calculate`
4. **API 失敗 fallback** — 切換到本地計算邏輯（對齊 Android `FareCalculator.kt`）

## 頁面結構（9 頁）

| 路徑 | 內容 | 關鍵元件 |
|------|------|----------|
| `/` | hero 主打「AI 接電話」(主菜) → AI 語音深入介紹 → 雙入口 → 三大差異化 → 三種叫車方式 → 車資試算 → 服務區域 → 評價 → B2B → 司機招募 → 終 CTA | DualHero, VoiceAiSection, OrderingChannels, FareCalculator, B2BSection |
| `/passenger` | 乘客專區 + 下載 App + 評價 | AppDownloadCTA, Testimonial |
| `/driver` | 司機招募 + 收入試算器 + 申請表單 | IncomeCalculator, DriverApplyForm |
| `/pricing` | 完整費率表 + 車資試算器 + 車資 FAQ（FAQPage） | FareCalculator, FareTable |
| `/routes` | 熱門路線車資與車程指南（AEO/GEO 重點，車資由 fare 邏輯衍生） | FaqList, `content/routes.ts` |
| `/faq` | 常見問題（25 題 6 類，FAQPage，原生 `<details>`） | FaqList, `content/faqs.ts` |
| `/about` | 關於我們・在地故事（E-E-A-T） | — |
| `/contact` | 聯絡表單（通用 / B2B / 客訴） | ContactForm |
| `/privacy` | 隱私政策 | — |

P1（上線後補）：`/terms`（服務條款，補上前 footer 暫不放連結）、`/ios-waitlist`

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
| `NEXT_PUBLIC_SITE_URL` | 網站正式 URL（影響 OG / sitemap） |
| `NEXT_PUBLIC_PLAY_STORE_URL` | Google Play 連結 |
| `NEXT_PUBLIC_IOS_WAITLIST_URL` | iOS 預約頁路徑 |
| `NEXT_PUBLIC_PHONE` | 撥打號碼（含國碼 +886） |
| `NEXT_PUBLIC_PHONE_DISPLAY` | 顯示用號碼（含 dash） |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID（選填） |

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

無需登入，CORS 已開 `*`：

- `GET /api/config/fare` — 車資費率配置（ISR 快取 1 小時）
- `POST /api/config/fare/calculate` — 預估車資計算（debounce 400ms）

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

在 Vercel Settings → Domains 加入 `hualientaxi.taxi`，按指示設定 DNS。`next.config.ts` 已設 `www → apex` 301 重導。

## 驗證清單（上線前）

### 內容（待替換真實素材 — 目前皆佔位）
- [ ] 真實品牌數據填入 `lib/site.ts` 的 `stats`（4.9 / 120 等目前是佔位，UI StatPill 仍會顯示）
- [x] 真實電話填入環境變數 `NEXT_PUBLIC_PHONE`（佔位 `+886900000000` 時，JSON-LD 與 llms.txt 會自動省略電話、只留 LINE）→ 已設為 `+88638907320`（顯示 `03-890-7320`），JSON-LD／llms.txt 電話揭露已自動放行
- [ ] `/about` 創辦故事、司機團隊照片 / 人數 / 年資（搜尋程式碼裡的 `TODO` 註解）
- [ ] 補 `public/og-image.png`（1200×630；schema `image` 目前暫指 `/logo.png`）與 `favicon.ico` / `apple-touch-icon.png`（layout 已引用但檔案缺）
- [ ] 真實第三方評價到位後，才可在 schema 加回 `aggregateRating`（自家網站自評會違反 Google 政策）
- [ ] AI 插畫生成並放到 `public/illustrations/`
- [ ] iOS waitlist 頁面建立（`/ios-waitlist`）或改用真實 App Store URL
- [ ] 隱私政策請律師審核；補 `/terms` 服務條款頁後在 footer 加回連結

### 技術
- [ ] `pnpm exec tsc --noEmit` 無錯誤
- [ ] `pnpm build` 成功
- [ ] 車資試算器拖 slider，看到 API 回傳數字
- [ ] 聯絡表單送出，收到 Resend email
- [ ] Lighthouse Mobile：Performance ≥ 90、Accessibility ≥ 95、SEO 100
- [ ] iPhone SE 實機測試對比度、按鈕點擊精準度

### SEO / GEO / AEO
- [ ] `/sitemap.xml` 含 9 頁、URL 為正式網域（非 localhost）
- [ ] `/robots.txt`、`/llms.txt` 內容正確、URL 為正式網域
- [ ] OG image 在 [opengraph.xyz](https://opengraph.xyz) 預覽正確
- [ ] 首頁含 `LocalBusiness`/`TaxiService` + `Organization` JSON-LD（[validator.schema.org](https://validator.schema.org)）
- [ ] `/faq`、`/routes`、`/pricing` 含 `FAQPage`；各子頁含 `BreadcrumbList`
- [ ] JSON-LD 無 `aggregateRating`、無假電話（真實資料到位前不放）
- [ ] Rich Results Test：LocalBusiness / Breadcrumb 可偵測；**FAQ 顯示「無富摘要資格」屬正常**（Google 已將 FAQ 富摘要限縮至權威網站；FAQPage 價值在 AI 引擎擷取）
- [ ] Google Search Console 提交 sitemap

## 檔案結構

```
gogocha-website/
├── app/
│   ├── layout.tsx           # 根 layout（fonts, header, footer, JSON-LD, viewport）
│   ├── globals.css          # Tailwind 4 @theme tokens
│   ├── page.tsx             # 首頁
│   ├── passenger/page.tsx
│   ├── driver/page.tsx
│   ├── pricing/page.tsx     # 含車資 FAQ（FAQPage）
│   ├── routes/page.tsx      # 熱門路線車資（AEO/GEO）
│   ├── faq/page.tsx         # 常見問題（FAQPage）
│   ├── about/page.tsx       # 關於我們（E-E-A-T）
│   ├── contact/page.tsx + ContactForm.tsx
│   ├── privacy/page.tsx
│   ├── llms.txt/route.ts    # GEO：給 AI 引擎的純文字導覽
│   ├── api/
│   │   ├── contact/route.ts
│   │   └── driver-apply/route.ts
│   ├── sitemap.ts / robots.ts / opengraph-image.tsx
├── components/
│   ├── ui/                  # 基礎 UI 元件（button, card, input, slider...）
│   ├── brand/               # Logo, BrandBadge
│   ├── layout/              # SiteHeader, SiteFooter, Section
│   ├── hero/                # DualHero, DualEntryCards
│   ├── fare-calculator/     # FareCalculator, FareTable
│   ├── driver/              # IncomeCalculator, DriverApplyForm
│   ├── sections/            # 首頁區塊 components
│   ├── seo/                 # JsonLd
│   └── shared/              # PhoneCTA, LineCTA, FaqList, FontSizeToggle, StatPill, Testimonial
├── lib/
│   ├── api/                 # fare.ts, schemas.ts
│   ├── seo/                 # jsonld.ts（Organization/LocalBusiness/Breadcrumb/FAQPage builders）
│   ├── site.ts              # 全站設定 + stats + serviceArea（13 鄉鎮單一資料源）
│   ├── fonts.ts             # next/font 配置
│   └── utils.ts             # cn, formatCurrency
├── content/                 # testimonials.ts, faqs.ts, routes.ts
└── public/                  # logo, splash-hero, illustrations/, screenshots/
```

## SEO / GEO / AEO 架構

2026-06 強化。策略：技術 SEO 已完備，重點放在「可被 AI 答案引擎擷取的在地事實內容」。

**結構化資料**（`lib/seo/jsonld.ts`，用 `<JsonLd>` 注入）：
- `Organization` + `LocalBusiness`（`@type` 同時掛 `TaxiService`）：全站 layout 注入。
- 計程車是 SAB（service-area business）：**不放街道地址**，用 `areaServed`（13 鄉鎮，取自 `site.ts` 的 `serviceArea`）+ 行政區級 `PostalAddress` + `geo` 中心點。
- **無 `aggregateRating`**：自家網站對自己評分會違反 Google 政策；真實第三方評價到位前不放。
- 電話佔位守衛 `isPlaceholderPhone()`：假號碼時 schema 與 llms.txt 自動省略電話、只留 LINE，真值一進環境變數即放行。
- `FAQPage`：`/faq`（全 25 題）、`/pricing`（車資子集）、`/routes`（OD 子集）。schema 內容＝該頁實際可見內容。**價值在 AEO/GEO**（ChatGPT / Perplexity / AI Overviews 擷取問答），非 Google FAQ 富摘要（已限縮至權威網站，一般商家頁不會長出折疊富摘要，屬正常）。
- `BreadcrumbList`：各子頁，`buildBreadcrumbJsonLd([{ name, path }])`。

**內容單一資料源**（UI 與 schema 共用，杜絕不同步）：
- `content/faqs.ts`：FAQ 題庫（欄位 `question` / `answer` 直接對齊 `buildFAQJsonLd`）。
- `content/routes.ts`：路線資料。車資**不寫死**，由 `estimateDayFare()` 經 `calculateFareLocally` + 固定中午時間衍生（費率改了自動同步，且避免 build 落在夜間誤加 20%）；車程 `estMinutes` 為在地常識手填。

**GEO**：`app/llms.txt/route.ts` 動態產生（URL 從 `site.url` 衍生），給 AI 引擎結構化導覽。

**折疊 UI**：`/faq`、`/routes` 用原生 `<details>`（`components/shared/FaqList.tsx`）——零 JS、內容即刻可被爬蟲擷取、原生無障礙，最符合長輩友善與 GEO。

## 與 Android App 的關聯

- **品牌色**：`app/globals.css` 的 `--color-taxi-yellow` 等對齊 `ui/theme/Color.kt`
- **Logo**：`public/logo.png` 直接複製自 `res/drawable/ic_launcher_foreground.png`
- **Hero 背景**：`public/splash-hero.jpg` 複製自 `res/drawable-nodpi/splash_cover.jpg`
- **車資計算邏輯**：`lib/api/fare.ts` 的 `calculateFareLocally` 對齊 `utils/FareCalculator.kt`
- **隱私政策文案**：`app/privacy/page.tsx` 從 `PassengerSettingsScreen.kt:537-609` 遷移改寫

## 維護注意事項

1. **所有文檔更新都寫到本 README.md**（user CLAUDE.md 強制，禁止建立其他 `.md`）
2. **絕對禁止使用 `accept-data-loss` 相關指令**
3. **後端 API 修改時**：同步檢查 `lib/api/schemas.ts` 的 Zod schema 是否仍符合 envelope 格式
4. **品牌統計更新**：直接改 `lib/site.ts` 的 `stats` 常數
5. **新增頁面**：記得同步加到 `app/sitemap.ts` 的 ROUTES 與 `SiteHeader.tsx` 的 NAV / `SiteFooter.tsx` 的 COLUMNS
6. **改 FAQ / 路線內容**：改 `content/faqs.ts` / `content/routes.ts`（UI 與 JSON-LD 共用同一份）；服務區域 13 鄉鎮改 `lib/site.ts` 的 `serviceArea`
7. **改費率**：改 `lib/api/fare.ts` 的 `FALLBACK_FARE_CONFIG`，`/routes` 估算車資自動跟著變（**勿在 `content/routes.ts` 寫死車資**）
8. **AI 語音叫車區塊（`components/sections/VoiceAiSection.tsx`）只講好處、不講架構**：對外一律「會發生什麼好事」（秒接不漏接、聽得懂國台語、忙線自動轉真人、3 秒配車），**禁止**寫出任何後端廠商名（如 OpenAI、AudioSocket）、AI 並發門檻、SIP trunk 號碼——那些是商業機密與攻擊面，屬內部文件，不進公開頁面。「忙線轉真人」是把系統的 graceful degradation 翻成消費者信任賣點，講好處、藏門檻。
9. **兩個「語音」不要混為一談（改文案的地雷）**：
   - **「打電話 AI 接聽」= 主菜**（hero 主打）：客人撥 `site.phoneDisplay`，AI 像真人接、聽得懂台語、忙線轉真人。文案一律寫「打電話 / 撥客服專線 → AI 接」。
   - **「App 語音輸入」= 次要既有功能**：在 App 裡對著手機說話免打字（passenger 頁 `App 語音輸入` 卡、Mic 圖示）。文案寫「在 App 裡說」。
   - 兩者**分開講**，別寫成「對 App 說話叫 AI」這種自相矛盾句。主菜定位散見於 `DualHero`、`VoiceAiSection`、`Differentiators` 第三點、`OrderingChannels` 電話卡、`FinalCTA`、`faqs.ts`「叫車與預約」、`llms.txt`、`site.description`、`opengraph-image`。
10. **禁止虛構 AI 數據**：接通率、平均接聽秒數等，沒有真實量測數字就不要寫進任何頁面或 trust strip。
