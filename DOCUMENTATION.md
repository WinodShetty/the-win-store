# THE WIN - Technical Documentation
Version: 1.0.0 (MVP)
Author: Engineer VK

## 1. Project Overview
**The Win** is a premium digital product store designed for high emotional conversion. It sells a curated bundle of 5 life-changing eBooks aimed at providing clarity, direction, and execution strategy to students and professionals.

## 2. Architecture Diagram (Conceptual)
```
[User Browser] 
      |
      v
[Frontend: React SPA] <---- [Single Point Config: siteConfig.js]
      |                       |
      v                       v
[Context API] <---------- [Data: products.js, translations.js, coupons.js]
      |
      v
[Razorpay SDK] (Payment)
      |
      v
[Success Page] (PDF Delivery)
```

## 3. Tech Stack
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS (Panchabhuta Theme)
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **State Management:** React Context API
- **Payment:** Razorpay JavaScript SDK (Mocked for MVP)

## 4. Single Point Control System
The entire website is controlled via `src/config/siteConfig.js`. 
- **Brand Identity:** Name, Domain, Logo.
- **Pricing:** Base, Offer, Bundle prices.
- **Contact:** WhatsApp number and pre-filled messages.
- **SEO:** Meta tags, OG images.
- **Admin:** Route and Password.

## 5. Multi-Language System
Located in `src/data/translations.js`.
- Supports **English**, **Telugu**, and **Hindi**.
- Easily expandable by adding a new language object.

## 6. Admin Panel
- **Route:** `/admin-vk` (Configurable)
- **Password:** `Vinod@15`
- **Functionality:** View mock revenue, orders, and stats. In future, this can be connected to Firebase or a custom backend.

## 7. Local Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Access the app at `http://localhost:3000`.

## 8. Workflow
1. User lands on Home page.
2. User selects language (English/Telugu/Hindi).
3. User adds individual books or the Bundle to cart.
4. User applies coupon (e.g., `WIN50`).
5. User clicks Checkout (Redirects to Success page for MVP).
6. Success page provides secure download links.

## 9. Design Philosophy
- **Panchabhuta Inspired:** Deep Sky Blue (Space), Forest Green (Earth), Ocean Teal (Water), Fire Orange (Fire), Warm Gold (Light).
- **Premium Feel:** Dark mode, glassmorphism, high-quality typography (Inter/Black), and smooth animations.
- **No White:** Pure black or deep gray backgrounds for a rich, high-end look.

---
*Developed with ❤️ by Engineer VK*
