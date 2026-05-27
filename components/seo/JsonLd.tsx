type Props = { data: Record<string, unknown> };

/**
 * 注入結構化資料（Schema.org）。
 * 資料皆為 server-side 受信任來源（lib/seo/jsonld.ts），不接受使用者輸入。
 * 仍轉義 `<` 防止 `</script>` 破壞標籤。
 */
function safeStringify(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: safeStringify(data) }}
    />
  );
}
