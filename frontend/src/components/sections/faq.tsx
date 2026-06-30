"use client";

import * as React from "react";
import { Accordion } from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const FAQ = () => {
  const STATIC_FAQ = [
    {
      title: "Pin của robot dùng được bao lâu trong một lần sạc?",
      content: "RoboClean Pro sở hữu pin dung lượng cao 5200mAh, cho phép hoạt động liên tục tối đa 180 phút trong một lần sạc ở chế độ tiêu chuẩn, đủ để làm sạch diện tích sàn lên tới 250m².",
    },
    {
      title: "Robot có tránh được dây điện, giầy dép và đồ chơi trẻ em không?",
      content: "Có! Nhờ hệ thống cảm biến LiDAR AI 3D tiên tiến và camera quét laser, RoboClean Pro có khả năng nhận diện các vật thể nhỏ từ 1cm như dây sạc điện thoại, đồ chơi, giầy dép để chủ động tránh xa mà không bị mắc kẹt.",
    },
    {
      title: "Chế độ sấy khô giẻ lau hoạt động như thế nào?",
      content: "Sau khi robot tự làm sạch giẻ lau tại trạm sạc, hệ thống sấy khí nóng 55°C sẽ tự động kích hoạt. Khí nóng tuần hoàn thổi đều vào giẻ trong vòng 2 giờ giúp sấy khô hoàn toàn, ngăn mùi hôi, nấm mốc và vi khuẩn phát triển.",
    },
    {
      title: "Tôi có cần tự châm nước sạch và đổ nước bẩn thường xuyên không?",
      content: "Trạm sạc RoboDock sở hữu bình chứa nước sạch 4L và bình chứa nước bẩn 4L. Bạn chỉ cần châm nước sạch và đổ nước bẩn sau khoảng 5-7 ngày sử dụng thông thường. Đồng thời túi chứa bụi 3L ở dock sạc có thể giữ bụi tới 60 ngày mới cần thay.",
    },
    {
      title: "Chính sách bảo hành và hỗ trợ kỹ thuật tại Việt Nam như thế nào?",
      content: "RoboClean cung cấp chế độ bảo hành chính hãng 24 tháng đối với robot và dock sạc. Chúng tôi cam kết 1 đổi 1 trong vòng 30 ngày nếu có lỗi từ nhà sản xuất, hỗ trợ kỹ thuật và giao nhận bảo hành tại nhà hoàn toàn miễn phí.",
    },
  ];

  const [faqItems, setFaqItems] = React.useState<any[]>(STATIC_FAQ);

  React.useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
        const res = await fetch(`${apiUrl}/faq`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          // Normalize API fields to match Accordion naming (question -> title, answer -> content)
          const normalized = data.data.map((f: any) => ({
            title: f.question,
            content: f.answer,
          }));
          setFaqItems(normalized);
        }
      } catch (err) {
        console.warn("[FAQ] Backend API offline. Using static FAQ data.");
      }
    };

    fetchFaqs();
  }, []);


  return (
    <section id="faq" className="bg-surface py-20 lg:py-32 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal duration={0.6} className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-primary">Giải Đáp Thắc Mắc</h2>
          <p className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
            CÂU HỎI THƯỜNG GẶP
          </p>
          <p className="text-lg text-text-secondary">
            Tìm câu trả lời nhanh chóng cho các câu hỏi phổ biến về vận hành và chính sách của RoboClean.
          </p>
        </ScrollReveal>

        {/* Accordion Component with ScrollReveal */}
        <ScrollReveal duration={0.7} delay={0.1}>
          <Accordion items={faqItems} />
        </ScrollReveal>

      </div>
    </section>
  );
};
