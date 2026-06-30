# RoboClean Landing Page

Trang giới thiệu sản phẩm Robot hút bụi thông minh RoboClean kết hợp các hiệu ứng chuyển động Scrollytelling, Parallax, Mini-Commerce, Chatbot AI và hệ thống theo dõi hành vi người dùng (Tracking Webhook).

## Cấu Trúc Dự Án

Dự án được xây dựng theo mô hình Monorepo:
* **`frontend/`:** Ứng dụng Next.js 15 (App Router, Tailwind CSS, TypeScript, Framer Motion, Zustand).
* **`backend/`:** Ứng dụng REST API viết bằng Spring Boot 3.3.0 (Java 17, Maven, JPA, H2 Database, Validation).
* **`docs/`:** Tài liệu đặc tả yêu cầu, thiết kế kiến trúc, API contract, cơ sở dữ liệu và roadmap dự án.

## Hướng Dẫn Chạy Dự Án

### 1. Khởi chạy Backend (Spring Boot)
Yêu cầu cài đặt sẵn Java 17+ và Maven.
```bash
cd backend
mvn spring-boot:run
```
API chạy mặc định tại cổng `http://localhost:8080`.
H2 Console xem cơ sở dữ liệu local: `http://localhost:8080/h2-console`.

### 2. Khởi chạy Frontend (Next.js)
Yêu cầu cài đặt sẵn Node.js 18+ (khuyên dùng Node.js 20+).
```bash
cd frontend
npm install
npm run dev
```
Trang web chạy tại `http://localhost:3000`.

## Giấy Phép & Tác Giả
Dự án được phát triển nhằm mục đích chứng minh năng lực thiết kế giao diện cao cấp và khả năng tích hợp Fullstack.
