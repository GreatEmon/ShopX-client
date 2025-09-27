# 🛍️ ShopX – Global B2B Wholesale Platform

**Live Site:** [https://shopx-110ff.web.app/](https://shopx-110ff.web.app/)  
**Client Repository:** [https://github.com/GreatEmon/ShopX-client](https://github.com/GreatEmon/ShopX-client)  
**Server Repository:** [https://github.com/GreatEmon/ShopX-backend](https://github.com/GreatEmon/ShopX-backend)

---

## 📖 Project Purpose
ShopX is a **global B2B wholesale marketplace** that connects **manufacturers & distributors** with **retailers, resellers, and institutional buyers**.  
The platform supports **multi-category product listings** (electronics, fashion, home appliances, machinery, and more) and offers **secure transactions, bulk order management, and logistics features**.

This project demonstrates:
- Modern full-stack development (MERN)
- Secure authentication & protected routes
- Professional UI/UX with a responsive design
- Efficient MongoDB operations for inventory management

---

## ✨ Key Features

### 🔑 Authentication & Security
- **Email/Password Authentication** with Firebase.
- **Google OAuth** social login.
- **JWT** implementation for all protected/private routes.
- Environment variables to secure Firebase & MongoDB credentials.

### 🖥️ Frontend
- **Dynamic Routing** with React Router.
- **Dynamic Title** updates per route.
- Responsive layout for **mobile, tablet, and desktop**.
- **Framer Motion animations** for smooth interactions.
- **SwiperJS** slider for the homepage banner.
- **React Hook Form** for form handling.
- Toast/SweetAlert notifications for all CRUD actions.

### 🛒 Core Marketplace Features
- **Home Page**
  - 3-slide promotional banner/slider.
  - Product Categories section (≥5 categories).
  - 2 extra informative sections.
- **Product Details**
  - Shows full product info.
  - Modal checkout form with user auto-fill.
  - Quantity increment/decrement with validation against minimum selling quantity.
  - Uses MongoDB `$inc` operator to **decrease main quantity** when purchased.
- **All Products Page** (Private)
  - Update product details (any user).
  - **Filter:** “Show Available Products” shows products with `minimum_selling_quantity > 100`.
  - **Toggle View:** Card ↔ Table view.
- **Add Product Page** (Private)
  - Add new products with brand, category, price, rating, and more.
- **Cart Page** (Private)
  - Displays products bought by the logged-in user.
  - Cancel/Remove button removes from cart and **increments main quantity** in DB using `$inc`.

### 🧭 Other Features
- Fully functional **404 Page**.
- **Loading Spinner** while data fetches.
- Beautiful **Navbar** with conditional login/register or user avatar + logout.
- Persistent login state on route refresh.
- Clean, recruiter-friendly design with **proper color contrast & spacing**.

---

## 🏗️ Tech Stack

### Frontend
- **React** (Vite)
- **React Router DOM**
- **Tailwind CSS + DaisyUI**
- **Framer Motion** (animations)
- **SwiperJS** (banner/slider)
- **React Hook Form**
- **React Icons**
- **React Rating Stars Component**
- **SweetAlert2 / React Hot Toast**

### Backend
- **Node.js / Express.js**
- **MongoDB & Mongoose**
- **JWT** (jsonwebtoken)
- **Cors**, **Dotenv**

---

## ⚙️ Environment Variables

Create a `.env` file in both **client** and **server** with the following:

### Client `.env`


---

## 🚀 Deployment
- **Client:** Firebase Hosting (with custom domain brandization)
- **Server:** Render (or any Node hosting)
- CORS configured and tested to avoid 404/504 errors.
- All private routes remain accessible after page refresh.

---

## 🧩 Installation & Run Locally

### Clone Repositories
```bash
git clone https://github.com/GreatEmon/ShopX-client
git clone https://github.com/GreatEmon/ShopX-backend

cd ShopX-client
npm install
npm run dev



### Server `.env`

cd ShopX-backend
npm install
nodemon index.js