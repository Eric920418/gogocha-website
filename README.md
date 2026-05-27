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

## 頁面結構（P0 = 6 頁）

| 路徑 | 內容 | 關鍵元件 |
|------|------|----------|
| `/` | 主導向 hero + 三大差異化 + 車資試算器 + 服務區域 + 評價 + B2B + 司機招募 + 終 CTA | DualHero, FareCalculator, B2BSection |
| `/passenger` | 乘客專區 + 下載 App + 評價 | AppDownloadCTA, Testimonial |
| `/driver` | 司機招募 + 收入試算器 + 申請表單 | IncomeCalculator, DriverApplyForm |
| `/pricing` | 完整費率表 + 車資試算器 + FAQ | FareCalculator, FareTable |
| `/contact` | 聯絡表單（通用 / B2B / 客訴） | ContactForm |
| `/privacy` | 隱私政策 | — |

P1（上線後補）：`/business`、`/coverage`、`/about`、`/terms`、`/ios-waitlist`

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
- `NEXT_PUBLIC_SITE_URL` 改為正式網址（如 `https://gogocha.tw`）
- `RESEND_API_KEY` 必須設定（否則 API 在 production 會回 503）
- `RESEND_FROM_DOMAIN` 必須在 Resend 完成 DNS 驗證

### 4. 自訂網域

在 Vercel Settings → Domains 加入 `gogocha.tw`，按指示設定 DNS。

## 驗證清單（上線前）

### 內容
- [ ] 真實品牌數據填入 `lib/site.ts` 的 `stats`
- [ ] 真實電話號碼填入環境變數
- [ ] AI 插畫生成並放到 `public/illustrations/`（風格 brief 見 plan file）
- [ ] iOS waitlist 頁面建立（`/ios-waitlist`）或改用真實 App Store URL
- [ ] 隱私政策請律師審核

### 技術
- [ ] `pnpm exec tsc --noEmit` 無錯誤
- [ ] `pnpm build` 成功
- [ ] 車資試算器拖 slider，看到 API 回傳數字
- [ ] 聯絡表單送出，收到 Resend email
- [ ] Lighthouse Mobile：Performance ≥ 90、Accessibility ≥ 95、SEO 100
- [ ] iPhone SE 實機測試對比度、按鈕點擊精準度

### SEO
- [ ] `/sitemap.xml` 內容正確
- [ ] `/robots.txt` 內容正確
- [ ] OG image 在 [opengraph.xyz](https://opengraph.xyz) 預覽正確
- [ ] 首頁 / pricing 含 `TaxiService` JSON-LD
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
│   ├── pricing/page.tsx
│   ├── contact/page.tsx + ContactForm.tsx
│   ├── privacy/page.tsx
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
│   └── shared/              # PhoneCTA, AppDownloadCTA, FontSizeToggle, StatPill, Testimonial
├── lib/
│   ├── api/                 # fare.ts, schemas.ts
│   ├── seo/                 # jsonld.ts
│   ├── site.ts              # 全站設定 + stats
│   ├── fonts.ts             # next/font 配置
│   └── utils.ts             # cn, formatCurrency
├── content/                 # testimonials.ts
└── public/                  # logo, splash-hero, illustrations/, screenshots/
```

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
