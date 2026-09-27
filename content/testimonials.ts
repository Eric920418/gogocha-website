export type Testimonial = {
  name: string;
  role: string;
  content: string;
  rating: number;
};

// 僅在取得可公開來源與授權後加入真實推薦。
export const testimonials: Testimonial[] = [];
