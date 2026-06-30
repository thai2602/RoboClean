# ĐẶC TẢ DỰ ÁN (PROJECT SPECIFICATION) - ROBOCLEAN LANDING PAGE

Tài liệu này mô tả tổng quan về dự án RoboClean Landing Page, xác định phạm vi, các tính năng chính, hành trình trải nghiệm của khách hàng (UX Flow) và mục tiêu hiệu năng.

---

## 1. Tổng Quan Dự Án
**RoboClean** là một dòng sản phẩm robot hút bụi thông minh cao cấp thế hệ mới, tích hợp các công nghệ dọn dẹp tiên tiến nhất (quét LiDAR, tự giặt giẻ, sấy khô bằng khí nóng và điều hướng AI).
Trang Landing Page được xây dựng nhằm:
* Giới thiệu các công năng vượt trội của sản phẩm một cách trực quan và sinh động.
* Tạo trải nghiệm cuộn kể chuyện (Scrollytelling) ấn tượng để thuyết phục khách hàng.
* Cho phép khách hàng thêm sản phẩm vào giỏ hàng, lưu yêu thích (Mini E-commerce).
* Cung cấp chatbot hỗ trợ AI trả lời câu hỏi trực tiếp.
* Thu thập dữ liệu khách hàng đăng ký nhận tin và phân tích hành vi tương tác trên trang.

---

## 2. Các Phân Hệ Tính Năng Chính (Key Features)

### 2.1. Hero Section (Parallax visual)
* Hình ảnh robot chất lượng cao hiển thị ở trung tâm trang web.
* Tiêu đề giới thiệu slogan ấn tượng kết hợp hiệu ứng cuộn Parallax (các lớp nền và chữ chuyển động với tốc độ khác nhau để tạo chiều sâu).
* Nút CTA (Call-to-Action) nổi bật dẫn đến Form đăng ký hoặc Giỏ hàng.

### 2.2. Tính Năng Nổi Bật (Scrollytelling Features)
* Kể câu chuyện về một chu kỳ dọn dẹp của robot qua từng thao tác cuộn:
  1. *Khởi động & Quét bản đồ:* Hiển thị hoạt họa robot quét LiDAR dựng mô hình 3D phòng.
  2. *Hút bụi & Lau nhà:* Trực quan hóa lực hút cực mạnh và hệ thống chổi kép.
  3. *Tự động đổ rác & Làm sạch:* Mô tả robot quay về dock sạc, tự hút rác lên túi chứa và giặt/sấy giẻ lau.
* Các hiệu ứng đồ họa và văn bản xuất hiện đồng bộ theo vị trí cuộn trang của người dùng.

### 2.3. Thông Số Kỹ Thuật (Technical Specs)
* Trình bày dưới dạng bảng so sánh hoặc các tab hiện đại giúp khách hàng dễ dàng tra cứu.
* Có tính năng so sánh giữa 2 phiên bản (RoboClean Standard vs. RoboClean Pro).
* Tích hợp hiệu ứng Skeleton Loading để hiển thị mượt mà trong lúc tải dữ liệu thông số từ backend.

### 2.4. Mini E-commerce (Thương Mại Điện Tử Thu Nhỏ)
* **Yêu thích (Favorites):** Khách hàng nhấn nút tim để đưa sản phẩm robot hoặc phụ kiện vào danh sách yêu thích (lưu trạng thái client-side).
* **Giỏ hàng (Cart):** Giỏ hàng mini (Slide-over panel) cho phép tăng/giảm số lượng sản phẩm, hiển thị tổng tiền, lưu trữ tạm thời qua LocalStorage.
* **Sản phẩm đã xem (Recently Viewed):** Danh sách nhỏ lưu giữ các sản phẩm/phụ kiện khách hàng vừa xem qua để tăng tỷ lệ chuyển đổi.

### 2.5. Form Đăng Ký Nhận Tin (Subscription Form)
* Form đăng ký nhận mã ưu đãi giảm giá 10%.
* Validate chặt chẽ định dạng Email, Họ tên, Số điện thoại (sử dụng Client-side React Hook Form + Zod).
* Gửi dữ liệu tới Backend REST API và đồng thời bắn thông báo tới Webhook ngoài (chạy thực tế).

### 2.6. Chatbot Tư Vấn Trực Tuyến (AI Chat Widget)
* Bong bóng Chatbox nằm cố định ở góc dưới bên phải màn hình.
* Sử dụng mô hình AI (Gemini hoặc OpenAI) để tự động trả lời các câu hỏi thường gặp của khách hàng về sản phẩm (vd: "Pin dùng được bao lâu?", "Lực hút bao nhiêu Pa?", "Chính sách bảo hành thế nào?").
* Thiết kế bong bóng gợi ý câu hỏi để khách hàng click nhanh.

### 2.7. Dark Mode & Chế Độ Ban Đêm
* Cho phép chuyển đổi linh hoạt chế độ Light/Dark.
* Ở chế độ Dark Mode, giao diện sẽ chuyển sang tông màu đen/xám huyền ảo làm nổi bật hiệu ứng ánh sáng LED của robot.

---

## 3. Chỉ Tiêu Hiệu Năng & SEO (KPIs)
* **Google PageSpeed Insights (Mobile):** Đạt điểm tối thiểu **85/100**. Tối ưu hóa dung lượng hình ảnh dưới định dạng WebP/AVIF và cấu hình lazy-loading.
* **SEO Technical:** Cấu hình đầy đủ thẻ Meta Title, Meta Description, các thẻ Open Graph (OG:Image, OG:Title) để hiển thị chuẩn xác khi share lên Facebook, Zalo, LinkedIn.
* **Responsive Layout:** Hỗ trợ tối đa hiển thị trên màn hình Desktop (1440px+), Tablet (768px - 1024px) và Smartphone (360px - 480px).
