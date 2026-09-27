import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { pages } from "@/lib/seo/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path }) => ({ url: new URL(path, site.url).href }));
}
