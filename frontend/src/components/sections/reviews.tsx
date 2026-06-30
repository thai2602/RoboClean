"use client";

import * as React from "react";
import { Star, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const Reviews = () => {
  const STATIC_REVIEWS = [
    {
      name: "Nguyễn Hoàng Nam",
      role: "Khách hàng mua RoboClean Pro",
      comment: "Robot hút bụi Pro Max này quá tuyệt vời. Nhà tôi nuôi 3 con mèo lông rụng ngập tràn nhưng từ khi có em này, sàn nhà bóng loáng. Hệ thống sấy khô giẻ khí nóng hoạt động hoàn hảo, không có mùi hôi.",
      rating: 5,
      avatar: "N",
    },
    {
      name: "Trần Thị Minh Anh",
      role: "Khách hàng mua RoboClean Pro",
      comment: "Thực sự rảnh tay! Trước dùng dòng cũ phải tự tháo giẻ giặt phơi, dòng này tự lo từ A đến Z. Cứ 2 tháng tôi mới phải đi đổ rác từ túi đựng của dock sạc một lần.",
      rating: 5,
      avatar: "M",
    },
    {
      name: "Phạm Minh Hoàng",
      role: "Khách hàng mua RoboClean Standard",
      comment: "Dù bản Standard không tự giặt giẻ nhưng lực hút 4000Pa cực kỳ mạnh, hút thảm rất sạch. App điều khiển vẽ bản đồ rất nhanh và chính xác.",
      rating: 4,
      avatar: "H",
    },
  ];

  const [reviewList, setReviewList] = React.useState<any[]>(STATIC_REVIEWS);

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
        const res = await fetch(`${apiUrl}/reviews`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          // Normalize names
          const normalized = data.data.map((r: any) => ({
            ...r,
            name: r.customerName || r.name,
            role: r.role || "Khách hàng RoboClean",
            avatar: (r.customerName || r.name || "K").substring(0, 1).toUpperCase()
          }));
          setReviewList(normalized);
        }
      } catch (err) {
        console.warn("[Reviews] Backend API offline. Using static review data.");
      }
    };

    fetchReviews();
  }, []);


  return (
    <section id="reviews" className="bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal duration={0.6} className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-primary">Đánh Giá Thực Tế</h2>
          <p className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
            KHÁCH HÀNG NÓI GÌ VỀ ROBOCLEAN
          </p>
          <p className="text-lg text-text-secondary">
            Những chia sẻ chân thực từ hàng nghìn khách hàng đã sở hữu và nâng tầm không gian sống của họ.
          </p>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewList.map((review, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              duration={0.6}
              delay={idx * 0.15}
              className="relative flex flex-col justify-between p-8 rounded-3xl border border-border bg-card shadow-sm hover:shadow-lg transition-all"
            >
              {/* Quote Mark */}
              <div className="absolute top-6 right-6 text-brand-primary/10">
                <Quote className="h-10 w-10 fill-current" />
              </div>

              {/* Review Content */}
              <div className="space-y-4">
                {/* Stars */}
                <div className="flex gap-1 text-brand-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-brand-accent" : "text-border"}`}
                    />
                  ))}
                </div>
                
                {/* Comment */}
                <p className="text-text-secondary leading-relaxed text-base italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border/50">
                {/* Avatar Initials */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary font-bold text-lg border border-brand-primary/20">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-base">{review.name}</h4>
                  <p className="text-xs text-text-secondary">{review.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
