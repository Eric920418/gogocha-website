export type Testimonial = {
  name: string;
  role: string;
  content: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "王阿嬤",
    role: "花蓮市・常客",
    content:
      "我手機按鍵小看不清楚，GoGoCha 字大又有語音叫車，孫子幫我裝了之後我自己就會用了。半夜叫車也都很快來。",
    rating: 5,
  },
  {
    name: "陳先生",
    role: "日本觀光客接待・吉安鄉",
    content:
      "帶日本朋友來花蓮，叫了 GoGoCha 三天都同一位司機很熟悉路線。價格按表跳，沒有加成，比包車划算多了。",
    rating: 5,
  },
  {
    name: "美崙觀光大飯店",
    role: "合作飯店",
    content:
      "旺季時客人要去太魯閣，櫃台一通電話 GoGoCha 半小時內到。我們不用再煩惱找車的事。",
    rating: 5,
  },
];
