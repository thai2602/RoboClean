import { Mail, Phone, MapPin, Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-12">
          
          {/* Logo & Slogan Column */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              ROBOCLEAN
            </span>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              Đột phá công nghệ hút bụi, lau nhà thông minh. Giúp gia đình bạn giải phóng sức lao động, tận hưởng cuộc sống hiện đại và trong lành hơn.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
              <Shield className="h-4 w-4 text-brand-primary" /> Đại lý phân phối độc quyền tại Việt Nam
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="font-bold text-text-primary text-sm tracking-wider uppercase">Liên Kết Nhanh</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <a href="#features" className="hover:text-brand-primary transition-colors">Tính năng</a>
              </li>
              <li>
                <a href="#products" className="hover:text-brand-primary transition-colors">Sản phẩm</a>
              </li>
              <li>
                <a href="#specifications" className="hover:text-brand-primary transition-colors">Thông số kỹ thuật</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-primary transition-colors">Hỏi đáp</a>
              </li>
            </ul>
          </div>

          {/* Contacts Column */}
          <div className="space-y-4">
            <h4 className="font-bold text-text-primary text-sm tracking-wider uppercase">Liên Hệ Hỗ Trợ</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-primary" />
                <span>Hotline: 1900 8888 (8:00 - 21:00)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-primary" />
                <span>support@roboclean.vn</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                <span>Tòa nhà Innovation, Công viên phần mềm Quang Trung, Quận 12, TP. Hồ Chí Minh</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between text-xs text-text-secondary gap-4">
          <p>&copy; {new Date().getFullYear()} RoboClean Việt Nam. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Chính sách bảo mật</a>
            <a href="#" className="hover:underline">Điều khoản dịch vụ</a>
            <a href="#" className="hover:underline">Chính sách bảo hành</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
