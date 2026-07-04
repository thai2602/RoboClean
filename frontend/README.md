# 🧹 RoboClean Frontend - Next.js Landing Page

Đây là phần giao diện người dùng (Client) của dự án **RoboClean** được xây dựng bằng Next.js 16.x (App Router), React 19 và Tailwind CSS v4.

---

## 🚀 Các Tính Năng Giao Diện
* **Scrollytelling & Parallax Hero**: Hoạt ảnh cuộn mượt mà dùng Framer Motion.
* **Zustand Store**: Quản lý Giỏ hàng (Cart), danh sách yêu thích (Wishlist) và lịch sử đã xem (Recently Viewed) đồng bộ LocalStorage.
* **React Portal CartDrawer**: Gắn giỏ hàng trực tiếp vào `document.body` để khắc phục lỗi xếp chồng (Stacking Context) trong trình duyệt Chrome.
* **AI Chat Advisor Bubble**: Giao diện chat nổi có phân tích và định dạng văn bản in đậm, ngắt dòng tự động.
* **Telemetry Event Hook**: Ghi nhận hành vi click/scroll của khách hàng gửi về API của Backend.

---

## 🏃 Hướng Dẫn Khởi Chạy

### 1. Cài đặt thư viện
```bash
npm install
```

### 2. Chạy môi trường thử nghiệm (Development)
```bash
npm run dev
```
* Mở trình duyệt tại: `http://localhost:3000`

### 3. Kiểm tra và Chạy bản tối ưu hiệu năng (Production)
Để có kết quả đo đạc tốc độ tải trang (Lighthouse) chuẩn xác nhất, bạn bắt buộc phải kiểm tra trên môi trường biên dịch tối ưu:
```bash
# Biên dịch mã nguồn tối ưu
npm run build

# Khởi chạy máy chủ Production
npm run start
```
* Mở trình duyệt đo Lighthouse tại: `http://localhost:3000`

---

## ⚙️ Biến Môi Trường (`.env`)
Tạo tệp `.env` tại thư mục này nếu bạn cần gọi API Backend ở địa chỉ khác:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

---

## 📚 Thông tin Kiến trúc & Triển khai
Xem hướng dẫn cài đặt cơ sở dữ liệu PostgreSQL, cấu hình khóa OpenRouter AI của Backend và cách deploy toàn diện lên Vercel/Render tại:
* 📑 [Tệp tài liệu gốc README.md của dự án](../README.md)
