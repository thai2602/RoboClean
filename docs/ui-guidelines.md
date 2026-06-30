# UI/UX GUIDELINES
# RoboClean Landing Page

Version: 1.0

---

# 1. Design Goals

Landing Page cần truyền tải hình ảnh của một sản phẩm công nghệ hiện đại với trải nghiệm trực quan, mượt mà và tập trung vào chuyển đổi người dùng (Conversion).

Design Principles

- Modern
- Clean
- Premium
- Interactive
- Mobile First
- Performance First

---

# 2. User Experience Goals

Người dùng cần có thể:

- Hiểu giá trị sản phẩm trong 5 giây đầu.
- Khám phá các tính năng thông qua cuộn trang.
- So sánh thông số kỹ thuật.
- Thêm sản phẩm vào Wishlist hoặc Cart.
- Đăng ký nhận ưu đãi.
- Tương tác với AI Chatbot.

---

# 3. Page Structure

```
Header

↓

Hero

↓

Features

↓

Specifications

↓

Products

↓

Reviews

↓

FAQ

↓

Newsletter

↓

Footer
```

Mỗi section nên chiếm khoảng 80–100vh (khi phù hợp) và được ngăn cách bằng khoảng trắng rõ ràng.

---

# 4. Navigation

Header

- Sticky
- Glassmorphism
- Logo
- Navigation Links
- Theme Switch
- Wishlist
- Cart

Navigation

- Smooth Scroll
- Active Section Highlight
- Mobile Drawer

---

# 5. Hero Section

Purpose

Thu hút sự chú ý ngay khi tải trang.

Requirements

- Một hình ảnh sản phẩm nổi bật.
- Tiêu đề ngắn gọn.
- Mô tả giá trị cốt lõi.
- Một CTA chính.
- Một CTA phụ (tùy chọn).

Motion

- Fade In
- Parallax
- Scroll Indicator

---

# 6. Feature Section

Purpose

Giới thiệu các tính năng chính.

Layout

Desktop

```
Text | Image
```

Section tiếp theo

```
Image | Text
```

Mobile

```
Image

↓

Text
```

Interaction

- Fade In
- Slide Up
- Icon Animation

---

# 7. Specification Section

Requirements

- Tab hoặc Segmented Control.
- Skeleton Loading khi chuyển dữ liệu.
- Responsive Table.

Transition

200–300ms.

---

# 8. Product Section

Card Content

- Product Image
- Name
- Price
- Discount
- Rating
- CTA

Supported Actions

- View Detail
- Add to Cart
- Add to Wishlist

Interaction

- Hover Elevation
- Scale
- Ripple
- Fly-to-Cart Animation

---

# 9. Review Section

Card

- Avatar
- Customer Name
- Rating
- Comment

Layout

Desktop

Grid

Mobile

Carousel

---

# 10. FAQ Section

Component

Accordion

Animation

Expand / Collapse

Duration

200ms

---

# 11. Newsletter Section

Fields

- Full Name
- Email
- Phone (Optional)

Button

Subscribe

States

- Default
- Hover
- Loading
- Success
- Error

---

# 12. Chatbot

Position

Bottom Right

Features

- Floating Button
- Welcome Message
- Suggested Questions
- Typing Indicator
- Auto Scroll

Animation

- Open
- Close
- Bounce
- Typing

---

# 13. Motion Guidelines

Animation Duration

150–300ms

Page Transition

300–500ms

Scroll Animation

Use Framer Motion.

Avoid excessive animations.

Respect prefers-reduced-motion.

---

# 14. Responsive Design

Breakpoints

| Device | Width |
|---------|------:|
| Mobile | <768px |
| Tablet | 768–1023px |
| Desktop | ≥1024px |

Requirements

- Mobile First
- Flexible Grid
- Responsive Images
- Touch Friendly

---

# 15. Accessibility

Minimum Touch Target

44 × 44 px

Contrast

WCAG AA

Images

Meaningful alt text.

Keyboard Navigation

Supported.

Focus State

Visible.

---

# 16. Performance Guidelines

Use

- next/image
- Lazy Loading
- Code Splitting

Avoid

- Large GIFs
- Heavy Videos
- Excessive Blur Effects

---

# 17. Visual Hierarchy

Priority

1. Hero Title
2. CTA
3. Product Image
4. Features
5. Specifications
6. Reviews
7. Newsletter

---

# 18. Micro-interactions

Wishlist

Heart Fill Animation

Cart

Fly-to-Cart

Buttons

Scale + Shadow

Cards

Lift on Hover

Inputs

Focus Ring

Chatbot

Typing Indicator

---

# 19. Empty & Loading States

Loading

Skeleton

Empty Wishlist

Illustration + CTA

Empty Cart

Illustration + Continue Shopping

API Error

Friendly Message + Retry

---

# 20. Success Criteria

✓ Responsive

✓ Accessible

✓ Fast

✓ Smooth

✓ Consistent

✓ Conversion-Oriented

✓ Follows Design System