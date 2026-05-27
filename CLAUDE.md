# CLAUDE.md — GoGoCha 官網工作指引

給未來 Claude Code 工作時的快速參考。完整資訊見 [README.md](./README.md)。

## 強制規則（覆蓋預設）

1. **文檔管理**：所有文檔更新寫到 README.md，**禁止建立其他 .md**（本檔除外）
2. **套件管理**：只用 **pnpm**（user CLAUDE.md 強制）
3. **資料庫安全**：禁止 `accept-data-loss` 相關指令
4. **錯誤顯示**：API 錯誤完整呈現在前端 UI（不要靜默吞掉）
5. **語言**：所有 user-facing 字串 zh-TW，無 i18n

## 設計鐵則

- **聚焦勝過完整**：每個頁面只主打 3-5 個賣點，禁止功能 dump
- **長輩友善**：內文 ≥18px、按鈕高 ≥56px、允許縮放（`maximum-scale=5`）、`A-/A+` 切換
- **動畫節制**：只用 fade-in + 微 translate，`prefers-reduced-motion` 必須完全停
- **顏色**：只用 `globals.css` 裡 `@theme` 定義的 12 色 token，**禁止**寫 hex literal
- **字體**：全站 Noto Sans TC，靠 weight 400/500/700/900 拉層次，**禁用襯線**

## 關鍵架構

### 資料流（車資試算器）

```
FareCalculator.tsx
  ↓ debounce 400ms
calculateFare()              [lib/api/fare.ts]
  ↓ POST
api.hualientaxi.taxi/api/config/fare/calculate
  ↓ envelope { success, data }
FareCalcResponseSchema.parse  [lib/api/schemas.ts]
  ↓ 失敗時
calculateFareLocally()        [本地 fallback，對齊 Android]
```

### 表單流（contact / driver-apply）

```
ContactForm.tsx
  ↓ POST
/api/contact (route.ts)
  ↓ Zod 驗證
Resend.emails.send()
  ↓ 失敗
完整錯誤回前端（HTTP 502 + msg）
```

### 雙角色入口（首頁）

- 主 hero：乘客導向（80% 流量）
- DualEntryCards：「我是司機」「我是業者」次要入口
- **禁止改回 tabbed hero**，會殺轉換率

## 變更時的同步檢查

| 變更類型 | 同步檢查 |
|---------|---------|
| 新增頁面 | `app/sitemap.ts` + `SiteHeader.tsx` NAV + `SiteFooter.tsx` COLUMNS |
| 改 server API | `lib/api/schemas.ts` + 確認 envelope 結構未變 |
| 改品牌色 | `app/globals.css` `@theme` + 確認與 Android `Color.kt` 一致 |
| 更新統計數字 | `lib/site.ts` 的 `stats` 物件 |

## 常用指令

```bash
pnpm dev              # 開發 server
pnpm build            # production build
pnpm exec tsc --noEmit  # 型別檢查
pnpm exec next lint   # ESLint
```

## 與 Android App 同步點

- 品牌色：`ui/theme/Color.kt` ↔ `app/globals.css` `--color-taxi-yellow*`
- 車資邏輯：`utils/FareCalculator.kt` ↔ `lib/api/fare.ts` `calculateFareLocally`
- 隱私政策：`PassengerSettingsScreen.kt:537-609` ↔ `app/privacy/page.tsx`

更動其中一邊時，記得確認另一邊是否要同步。
