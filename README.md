# 🧹 RoboClean - Premium Fullstack Smart Vacuum Robot Landing Page

Trang Landing Page giới thiệu thiết bị thông minh **RoboClean** kết hợp trải nghiệm thiết kế cuộn kể chuyện (**Scrollytelling**), hiệu ứng chuyển động **Framer Motion**, cùng hệ thống quản lý **Mini Ecommerce (Zustand)**, **Chatbot AI (Google Gemini)** và **Behaviour Telemetry Tracking (Spring Boot & Webhooks)**.

---

## 🚀 Tính Năng Nổi Bật

### 1. Trải nghiệm UI/UX Kể Chuyện (Scrollytelling & Motion)
* **Parallax Scroll:** Hiệu ứng cuộn dịch chuyển ảnh Robot 3D nổi bật theo chiều cuộn trang.
* **ScrollReveal:** Các phần tử card thông số, tính năng tự động trượt, mờ và sắp xếp tuần tự khi cuộn vào viewport.
* **Responsive Layout:** Giao diện tối ưu hoàn hảo trên mọi kích thước màn hình (Mobile Drawer mượt mà).

### 2. Mini E-commerce (Zustand & LocalStorage)
* **Cart Drawer:** Giỏ hàng trượt mượt mà cho phép điều chỉnh số lượng, xóa và tự động tính tổng tiền thực tế.
* **Favorites Wishlist:** Yêu thích sản phẩm với chỉ báo nhấp nháy cập nhật số lượng tức thì trên Navbar.
* **Recently Viewed:** Lưu lịch sử tối đa 5 sản phẩm đã xem gần nhất của khách hàng.

### 3. Trợ Lý Ảo Chatbot AI (Google Gemini API Proxy)
* **Secure Token Proxy:** Truy vấn Gemini API trực tiếp từ Backend để ẩn API key khỏi client.
* **Interactive AI Chat:** Bong bóng chào tự động sau 5s, chip câu hỏi gợi ý nhanh, hiệu ứng ba dấu chấm chờ AI trả lời (`...` pulsing dots).
* **Regex Fallback Engine:** Bộ lọc thông minh tự động trả lời lập tức các câu hỏi phổ biến về giá cả, bảo hành và tự giặt giẻ khi mất kết nối mạng.

### 4. Telemetry Interaction Tracking
* **Click & Scroll Capturing:** Ghi nhận phiên làm việc (`sessionId`) của khách hàng, lưu trữ dữ liệu click và mức độ cuộn trang (25%, 50%, 75%, 100%) xuống H2 Database.
* **Async Webhook Push:** Đồng bộ hành vi khách hàng lên hệ thống ngoài (ví dụ: webhook.site, Make.com) không đồng bộ thông qua Java Executor Thread Pool.

---

## 🛠️ Công Nghệ Sử Dụng

### Frontend
* **Core:** Next.js 16.x (App Router) & React 19
* **Styling:** Tailwind CSS v4 & CSS Variables
* **State Management:** Zustand with local storage persistence
* **Animations:** Framer Motion
* **Forms:** React Hook Form & Zod Validation

### Backend
* **Core:** Spring Boot 4.1.0 & Java 17
* **Database:** H2 In-Memory Database (development)
* **JPA/ORM:** Spring Data JPA & Hibernate 7
* **JSON Utility:** Jackson Databind

---

## 📦 Cấu Trúc Thư Mục

```bash
RoboClean/
├── frontend/               # Mã nguồn ứng dụng Next.js (Client)
│   ├── src/app/            # App Router, Layout và Trang chính
│   ├── src/components/     # UI components và các Section chính
│   ├── src/store/          # Zustand stores (Cart, Wishlist, Recently Viewed)
│   └── src/hooks/          # Custom tracking hook
├── backend/                # Mã nguồn API Server (Spring Boot)
│   ├── src/main/java/      # Entities, Repositories, Controllers, DTOs
│   └── src/main/resources/ # application.properties cấu hình DB
└── docs/                   # Tài liệu đặc tả, API và thiết kế
```

---

## 🏃 Hướng Dẫn Khởi Chạy Dự Án

### 1. Thiết lập Biến Môi Trường (Environment Variables)

* **Ở Backend (`backend/`):**
  Copy file `.env.example` thành `.env` và cấu hình:
  ```env
  GEMINI_API_KEY=your-gemini-api-key-here
  CORS_ALLOWED_ORIGINS=http://localhost:3000
  TRACKING_WEBHOOK_URL=https://webhook.site/your-id
  ```

* **Ở Frontend (`frontend/`):**
  Copy file `.env.example` thành `.env` và cấu hình:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
  ```

### 2. Khởi Chạy Backend (Spring Boot)
```bash
cd backend
# Build và chạy ứng dụng
.\mvnw.cmd spring-boot:run
```
* API Server sẽ chạy tại: `http://localhost:8080`
* H2 Console Database URL: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:robocleandb`)

### 3. Khởi Chạy Frontend (Next.js)
```bash
cd frontend
# Cài đặt thư viện
npm install
# Chạy dev server
npm run dev
```
* Trang web sẽ khởi chạy tại: `http://localhost:3000`

---

## 🚀 Hướng Dẫn Triển Khai (Deployment)

Chi tiết quy trình cấu hình tự động đẩy code và triển khai lên môi trường sản xuất (**Vercel** cho Frontend, **Render** cho Backend và **Neon.tech** cho PostgreSQL Cloud) đã được viết chi tiết tại:
* 📑 [docs/deployment.md](file:///c:/WorkSpace/Web/RoboClean/docs/deployment.md)
