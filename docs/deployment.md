# HƯỚNG DẪN TRIỂN KHAI (DEPLOYMENT GUIDE) - ROBOCLEAN LANDING PAGE

Tài liệu này hướng dẫn cách cấu hình và deploy dự án RoboClean (cả Frontend và Backend) lên môi trường Internet thực tế miễn phí hoặc tối ưu nhất.

---

## 1. Triển Khai Frontend (Next.js) Lên Vercel

Vercel là nền tảng tốt nhất để deploy Next.js nhờ hỗ trợ Edge Network, tối ưu hóa hình ảnh tự động và zero-config.

### Các Bước Thực Hiện:
1. Đẩy mã nguồn Frontend lên Github Repository.
2. Đăng nhập vào trang quản trị [Vercel](https://vercel.com) bằng tài khoản Github.
3. Chọn **Add New > Project**, sau đó Import repository của RoboClean.
4. Ở phần cấu hình dự án:
   * **Framework Preset:** Chọn `Next.js`.
   * **Root Directory:** Chọn thư mục `frontend` (nếu dự án chia monorepo).
5. Thiết lập các **Environment Variables** (Biến môi trường) cần thiết:
   * `NEXT_PUBLIC_API_URL`: URL API của backend sau khi deploy (ví dụ: `https://roboclean-api.onrender.com/api/v1`).
   * `NEXT_PUBLIC_TRACKING_WEBHOOK_URL`: Địa chỉ webhook dùng để nhận logs click/scroll (ví dụ: `https://webhook.site/#!/...` hoặc Make hook).
6. Nhấn nút **Deploy** và đợi khoảng 1-2 phút để hệ thống build xong.
7. Vercel sẽ cung cấp một tên miền miễn phí dạng `*.vercel.app`.

---

## 2. Triển Khai Backend (Spring Boot) Lên Render

Render hỗ trợ deploy ứng dụng Web Services từ Dockerfile hoặc build trực tiếp mã nguồn Java/Maven một cách nhanh chóng.

### Các Bước Thực Hiện:
1. Đăng nhập vào [Render.com](https://render.com).
2. Chọn **New > Web Service**.
3. Kết nối tài khoản GitHub và chọn repository chứa code backend.
4. Ở phần cấu hình build:
   * **Root Directory:** Chọn thư mục `backend`.
   * **Runtime:** Chọn `Docker` (khuyến khích viết một Dockerfile đơn giản) hoặc chọn `Java` làm runtime build mặc định.
   * **Build Command:** `mvn clean package -DskipTests` (Nếu dùng Java runtime).
   * **Start Command:** `java -jar target/*.jar`
5. Khai báo các **Environment Variables**:
   * `SPRING_PROFILES_ACTIVE`: `prod` (để kích hoạt cấu hình production).
   * `SPRING_DATASOURCE_URL`: URL kết nối tới database PostgreSQL Cloud.
   * `SPRING_DATASOURCE_USERNAME`: Tên tài khoản database.
   * `SPRING_DATASOURCE_PASSWORD`: Mật khẩu database.
   * `GEMINI_API_KEY`: API Key của Google Gemini AI Studio (giữ bí mật ở backend).
   * `CORS_ALLOWED_ORIGINS`: Địa chỉ URL Frontend trên Vercel (ví dụ: `https://roboclean.vercel.app`) để tránh lỗi CORS.
6. Chọn cấu hình gói Free hoặc Starter và nhấn **Create Web Service**.

---

## 3. Cấu Hình Cơ Sở Dữ Liệu (PostgreSQL Cloud) Lên Neon / Supabase

Neon cung cấp cơ sở dữ liệu Serverless PostgreSQL chất lượng cao, khởi tạo nhanh trong 3 giây và có gói miễn phí rộng rãi.

### Các Bước Thực Hiện:
1. Truy cập [Neon.tech](https://neon.tech) và đăng ký tài khoản.
2. Tạo một Project mới và chọn vùng máy chủ (Region) gần Việt Nam (như Singapore hoặc Asia Pacific) để giảm độ trễ (latency).
3. Sau khi khởi tạo xong, hệ thống sẽ cấp một chuỗi kết nối **Connection String** dạng:
   `postgresql://[user]:[password]@[host]/[dbname]?sslmode=require`
4. Copy chuỗi này và dán vào phần cấu hình biến môi trường `SPRING_DATASOURCE_URL` của Backend trên Render.

---

## 4. Tích Hợp Webhook Phân Tích Hành Vi Người Dùng

Để lưu vết click, cuộn trang mà không làm nặng database nội bộ, chúng ta sẽ cấu hình webhook ngoài:
* **Webhook.site:** Sử dụng trong giai đoạn test. Bạn truy cập [Webhook.site](https://webhook.site), copy URL nhận tin duy nhất của bạn, điền vào biến môi trường `NEXT_PUBLIC_TRACKING_WEBHOOK_URL` ở FE.
* **Make.com:** Tạo một kịch bản (Scenario) với module khởi đầu là **Custom Webhook**. Copy Webhook URL nhận được dán vào FE. Thiết lập luồng lưu tự động dữ liệu sang Google Sheet để khách hàng dễ dàng theo dõi trực quan số lượng click và scroll của người dùng thực tế.
