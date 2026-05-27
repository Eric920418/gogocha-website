import { Noto_Sans_TC } from "next/font/google";

export const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-noto-sans-tc",
  weight: ["400", "500", "700", "900"],
  display: "swap",
});
