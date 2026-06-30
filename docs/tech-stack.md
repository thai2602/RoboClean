# ĐẶC TẢ CÔNG NGHỆ (TECHNOLOGY STACK) - ROBOCLEAN LANDING PAGE

Tài liệu này xác định chi tiết các công nghệ, phiên bản, thư viện bổ trợ và hạ tầng triển khai được sử dụng trong dự án RoboClean.

---

# Frontend

## Framework
- Next.js 15 (App Router)
- React 19
- TypeScript (Strict Mode)

## Rendering Strategy
- Static Rendering: Hero, Features, FAQ, Product Showcase.
- Server Components: Product data fetching.
- Client Components: Cart, Wishlist, Chatbot, Theme Switcher.

## Styling
- Tailwind CSS
- Utility-first approach
- Responsive-first design
- CSS Variables for themes
- No inline styles

## State Management
- Use Zustand only for global client state (cart, wishlist, recently viewed).
- Do not store server-fetched product data in Zustand.
- Fetch product data using Server Components whenever possible.
- Persist Middleware
- Stores:
  - cartStore
  - wishlistStore
  - recentlyViewedStore

## Animation
- Use Framer Motion for:
  - Scroll reveal
  - Parallax
  - Hover interactions
  - Page transitions
- Avoid:
  - Infinite animations
  - Heavy GPU effects
  - Animations longer than 500ms
- Scroll Reveal
- Parallax
- Hover Micro-interactions
- Page Transition

## Forms
- React Hook Form
- Zod

## Theme
- next-themes

## Icons
- lucide-react

## HTTP Client
- Native Fetch API

## Code Quality
- ESLint
- Prettier
- Absolute Imports
- Reusable Components
- Composition Pattern
---

## 2. Backend (Spring Boot)

### Core Stack

- **Language:** Java 17 LTS (khuyến nghị) hoặc Java 21 LTS
- **Framework:** Spring Boot 3.x
- **Build Tool:** Maven

### Data Access

- Spring Data JPA
- PostgreSQL JDBC Driver (Production)
- H2 Database (Local Development & Testing)

### Validation

- `spring-boot-starter-validation`
- Bean Validation (`@Valid`, `@Email`, `@NotBlank`, `@Size`, ...)

### HTTP Client & AI Integration

- Spring WebClient (khuyến nghị)
- Hoặc Spring AI để tích hợp Google Gemini / OpenAI

### Utilities

- Lombok
- SLF4J + Logback (Logging)

---

## 3. Database & External Integrations

### Database

**Development**

- H2 Database (In-Memory)

**Production**

- PostgreSQL

**Cloud Providers (Recommended)**

- Neon
- Supabase

### External Webhook

Hệ thống hỗ trợ gửi dữ liệu tới các dịch vụ bên ngoài thông qua HTTP Webhook.

Use Cases

- Newsletter Subscription
- User Tracking Events
- Automation Workflow

Supported Providers

- Webhook.site (Testing)
- Make
- Zapier

---

## 4. Deployment

### Frontend

- Vercel

### Backend

- Render
- Railway

### Database

- Neon PostgreSQL
- Supabase PostgreSQL

### Version Control

- Git
- GitHub

### CI/CD

- GitHub Repository Integration
- Automatic Build & Deployment