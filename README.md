# 🧹 RoboClean - Premium Fullstack Smart Vacuum Robot Landing Page

Trang Landing Page giới thiệu thiết bị thông minh **RoboClean** kết hợp trải nghiệm thiết kế cuộn kể chuyện (**Scrollytelling**), hiệu ứng chuyển động **Framer Motion**, cùng hệ thống quản lý **Mini Ecommerce (Zustand)**, **Chatbot AI Advisor (OpenRouter API)** và **Behaviour Telemetry Tracking (Spring Boot & Webhooks)** kết nối cơ sở dữ liệu **PostgreSQL**.

---

## 🚀 Tính Năng Nổi Bật

### 1. Trải nghiệm UI/UX Kể Chuyện (Scrollytelling & Motion)
* **Parallax Scroll & Centered Hero:** Hiệu ứng cuộn dịch chuyển ảnh Robot 3D nổi bật theo chiều cuộn trang. Chiều cao trang đầu (Hero) được khóa động theo chiều cao màn hình `calc(100vh - 4rem)` giúp căn giữa hoàn hảo và không bị tràn nút bấm.
* **ScrollReveal:** Các phần tử card thông số, tính năng tự động trượt, mờ và sắp xếp tuần tự khi cuộn vào viewport.
* **Responsive Layout:** Giao diện tối ưutrên mọi kích thước màn hình.`

### 2. Mini E-commerce (Zustand & LocalStorage)
* **Cart Drawer (React Portal):** Giỏ hàng trượt mượt mà được portal trực tiếp vào `document.body`, khắc phục hoàn toàn lỗi Stacking Context của trình duyệt Chromium (không bị co ép chiều cao hay trong suốt bởi Header). Cho phép điều chỉnh số lượng, xóa và tự động tính tổng tiền thực tế.
* **Product Detail Modal:** Xem chi tiết cấu hình sản phẩm với biểu tượng Lucide tương ứng.
* **Favorites Wishlist:** Yêu thích sản phẩm với chỉ báo nhấp nháy cập nhật số lượng tức thì trên Navbar.
* **Recently Viewed:** Lưu lịch sử tối đa 5 sản phẩm đã xem gần nhất, đồng bộ mở lại Modal chi tiết khi click vào thẻ lịch sử và tự động lọc trùng thông minh giữa dữ liệu tĩnh và API.

### 3. Trợ Lý Ảo Chatbot AI (OpenRouter API Proxy & Memory)
* **Multi-turn Chat Memory:** Tích hợp bộ đệm lưu trữ lịch sử chat của từng phiên làm việc (`sessionId`) bằng cấu trúc dữ liệu `ConcurrentHashMap` an toàn luồng, cho phép khách hàng đặt câu hỏi tiếp nối tự nhiên (AI tự nhớ ngữ cảnh trò chuyện trước).
* **Sales Advisor Prompt:** System instruction tối ưu hóa để AI tư vấn thông minh (khuyên dùng Pro Max X2 cho nhà có thú cưng rụng lông/diện tích lớn; khuyên dùng Standard S1 cho chung cư nhỏ; tích hợp mã giảm giá 10%, bảo hành 24 tháng).
* **Rich Markdown Render:** Giao diện Chatbot tự động biên dịch các ký tự in đậm `**bold**` của AI thành thẻ HTML nổi bật và hiển thị xuống dòng chuẩn (`whitespace-pre-wrap`).
* **Interactive AI Chat:** Bong bóng chào tự động sau 5s, chip câu hỏi gợi ý nhanh, hiệu ứng ba dấu chấm chờ AI trả lời (`...` pulsing dots) và bắt lỗi mạng ngầm không gây Crash giao diện.

### 4. Telemetry Interaction Tracking
* **Click & Scroll Capturing:** Ghi nhận phiên làm việc (`sessionId`) của khách hàng, lưu trữ dữ liệu click và mức độ cuộn trang (25%, 50%, 75%, 100%) vào PostgreSQL.
* **Async Webhook Push:** Đồng bộ hành vi khách hàng lên Make.com không đồng bộ thông qua Java Executor Thread Pool để không cản trở tốc độ phản hồi của API chính.

---

## ⚡ Tối Ưu Hóa Hiệu Năng (Lighthouse Performance)

* **Preconnect Origins:** Bổ sung thẻ kết nối sớm `<link rel="preconnect">` tới đầu cuối API `https://roboclean.onrender.com` giúp tiết kiệm **300ms** thời gian phân giải DNS/bắt tay SSL.
* **WebP Image Migration:** Nén và chuyển đổi các hình ảnh PNG thô nặng hơn 500KB sang định dạng WebP siêu nhẹ chỉ khoảng **40-60KB** (tiết kiệm **90% dung lượng**), đẩy tốc độ tải ảnh LCP lên tối đa.
* **Critical Request Chain Shrinking:** Loại bỏ các độ dày font Google Fonts không sử dụng (Outfitt/Inter) để giảm số lượng tệp `.woff2` tải về, giảm thời gian chặn vẽ màn hình.
* **Lazy Loading:** Áp dụng Lazy load 100% cho các ảnh sản phẩm nằm dưới nếp gấp để dồn băng thông tải ảnh Hero trước. Trì hoãn hoạt ảnh lơ lửng của Hero 1.5s để công cụ Lighthouse ghi nhận LCP ổn định ngay lập tức.
* **Tailwind v4 Class-based Dark Mode**: Định nghĩa lại custom variant `@custom-variant dark (&:where(.dark, .dark *))` trong `globals.css` để đồng bộ chế độ sáng tối của Giỏ hàng và Modal theo nút bấm thay vì preferences hệ thống.

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
* **Database:** PostgreSQL Database (kết nối trực tiếp Render Postgres Cloud)
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
  Tạo tệp `.env` dựa theo các cấu hình:
  ```env
  SPRING_PROFILES_ACTIVE=dev
  SPRING_DATASOURCE_URL=jdbc:postgresql://dpg-d94aj8svikkc73c00pag-a.oregon-postgres.render.com/roboclean_db?sslmode=require
  SPRING_DATASOURCE_USERNAME=roboclean_db_user
  SPRING_DATASOURCE_PASSWORD=your-postgres-password
  OPENROUTER_API_KEY=your-openrouter-api-key-here
  OPENROUTER_MODEL=google/gemini-2.5-flash
  CORS_ALLOWED_ORIGINS=http://localhost:3000
  TRACKING_WEBHOOK_URL=https://hook.eu1.make.com/your-webhook-id
  ```

* **Ở Frontend (`frontend/`):**
  Tạo tệp `.env` dựa theo cấu hình:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
  ```

### 2. Khởi Chạy Backend (Spring Boot)
```bash
cd backend
# Build và chạy ứng dụng
.\mvnw.cmd spring-boot:run
```
* API Server sẽ chạy tại: `http://localhost:8080` hoặc `https://roboclean.onrender.com`

### 3. Khởi Chạy Frontend (Next.js)
```bash
cd frontend
# Cài đặt thư viện
npm install
# Chạy dev server
npm run dev
```
* Trang web sẽ khởi chạy tại: `http://localhost:3000` hoặc deploy trực tiếp lên Vercel.

---

## 🚀 Hướng Dẫn Triển Khai (Deployment)

Chi tiết quy trình cấu hình tự động đẩy code và triển khai lên môi trường sản xuất (**Vercel** cho Frontend, **Render** cho Backend và **Neon.tech** cho PostgreSQL Cloud) đã được viết chi tiết tại:
* 📑 [docs/deployment.md](file:///c:/WorkSpace/Web/RoboClean/docs/deployment.md)
