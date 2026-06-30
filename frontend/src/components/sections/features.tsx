import { Cpu, Wind, RefreshCw, Layers } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const Features = () => {
  const featureList = [
    {
      icon: Cpu,
      title: "Định Vị LiDAR AI 3D",
      description: "Hệ thống quét laser LiDAR thế hệ mới kết hợp thuật toán AI nhận diện chướng ngại vật chính xác đến từng milimet, dựng bản đồ 3D ngôi nhà nhanh chóng.",
      color: "text-brand-primary border-brand-primary/10 bg-brand-primary/5",
    },
    {
      icon: Wind,
      title: "Lực Hút Vượt Trội 6000Pa",
      description: "Động cơ không chổi than tạo lực hút siêu mạnh dễ dàng quét sạch mọi bụi bẩn từ bụi mịn trên sàn gỗ cho tới các mảnh vụn lớn giấu sâu trong thảm.",
      color: "text-brand-secondary border-brand-secondary/10 bg-brand-secondary/5",
    },
    {
      icon: RefreshCw,
      title: "Tự Giặt & Sấy Khô Giẻ",
      description: "Sau khi làm sạch, robot tự quay về dock để giặt giẻ lau và sấy khô bằng khí nóng 55°C giúp ngăn chặn nấm mốc, vi khuẩn và mùi hôi phát sinh.",
      color: "text-brand-accent border-brand-accent/10 bg-brand-accent/5",
    },
    {
      icon: Layers,
      title: "Trạm Sạc Đa Năng 6-Trong-1",
      description: "Trạm sạc tự động hoàn toàn: Tự thu gom rác, tự bơm nước sạch, tự xả nước bẩn, tự làm sạch khay giặt và cấp điện thông minh bảo vệ pin.",
      color: "text-brand-success border-brand-success/10 bg-brand-success/5",
    },
  ];

  return (
    <section id="features" className="bg-surface py-20 lg:py-32 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal duration={0.6} className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-primary">Tính Năng Vượt Trội</h2>
          <p className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
            CÔNG NGHỆ DỌN DẸP TIÊN TIẾN NHẤT
          </p>
          <p className="text-lg text-text-secondary">
            Thiết kế để mang lại trải nghiệm làm sạch hoàn hảo mà không cần bạn phải động tay vào.
          </p>
        </ScrollReveal>

        {/* Feature Cards Grid (Staggered ScrollReveal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featureList.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal
                key={idx}
                direction="up"
                duration={0.6}
                delay={idx * 0.1}
                className="group relative flex flex-col p-8 rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:border-text-primary/10 hover:-translate-y-1"
              >
                <div className={`p-3 rounded-2xl border w-fit mb-6 ${feature.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-brand-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
