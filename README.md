# Nexora — Modern E-Commerce Store

A modern, responsive e-commerce web application built with **React, Vite, Tailwind CSS, and Redux Toolkit**. The project uses a clean Spatial UI aesthetic with a soft lavender/purple visual system, responsive product browsing, cart management, and polished interactions.

## ✨ Features

- 🛍️ Product listing and product details
- 🔎 Product search
- 🗂️ Category filtering
- 💰 Maximum price filtering with dynamic range styling
- 🛒 Add products to cart
- ➕ / ➖ Cart quantity controls
- 🗑️ Remove products from cart
- 🧹 Clear entire cart
- 💾 Persistent cart using Redux Persist
- 🔔 Animated add-to-cart toast notifications
- 📱 Responsive desktop, tablet, and mobile UI
- 🎨 Spatial UI / glassmorphism-inspired styling
- 💜 Lavender and purple premium visual theme
- 🧭 React Router navigation
- 🔄 Loading and error states
- ❌ Custom Page Not Found handling

## 🛠️ Technologies

- React
- Vite
- Tailwind CSS
- Redux Toolkit
- Redux Persist
- React Router DOM
- JavaScript (ES6+)
- Fake Store API

## 📁 Project Structure

```text
src/
├── components/
│   ├── CartItem.jsx
│   ├── ProductCard.jsx
│   ├── ProductSkeleton.jsx
│   └── Toast.jsx
├── pages/
│   ├── Products.jsx
│   ├── ProductDetails.jsx
│   └── Cart.jsx
├── redux/
│   ├── cartSlice.js
│   ├── notificationSlice.js
│   ├── productSlice.js
│   └── store.js
├── App.jsx
├── main.jsx
└── index.css
```

> File names can vary slightly depending on the final project structure.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dhruvpatel7777/E-Commerce-Catalog
cd E-Commerce-Catalog
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

## 📦 Production Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🛒 Cart

The cart is managed with **Redux Toolkit** and supports:

- Add item
- Increase quantity
- Decrease quantity
- Remove item
- Clear cart
- Total item calculation
- Total price calculation

**Redux Persist** keeps cart data after a browser refresh.

## 🔔 Notifications

Adding a product to the cart displays a polished toast notification with:

- Success icon
- Product name
- Close button
- Automatic dismissal
- Progress indicator
- Responsive positioning

## 🎨 UI Design

Nexora follows a modern Spatial UI design language:

- Soft lavender/purple background
- Decorative dashed/dotted background pattern
- White and off-white containers
- Rounded product cards
- Subtle borders
- Soft shadows
- Glassmorphism effects
- Purple accent colors
- Clean modern typography
- Responsive spacing

The redesign improves the visual appearance while preserving the application's core structure and functionality.

## 📱 Responsive Design

### Desktop
- Multi-column product grid
- Spacious navigation
- Two-column product details
- Cart items and order summary side by side

### Tablet
- Responsive product grid
- Flexible filters
- Adaptive cart layout

### Mobile
- Single-column product grid
- Stacked filters
- Responsive navbar
- Mobile-friendly cart controls
- Responsive product details

## 🔀 Routes

| Route | Description |
|---|---|
| `/` | Products page |
| `/product/:id` | Product details |
| `/cart` | Shopping cart |
| `*` | Page Not Found |

## 🌐 Product API

Product information is loaded from the **Fake Store API**, including:

- Title
- Price
- Description
- Category
- Image
- Rating
- Review count

## 🧪 Testing Checklist

Verify that:

- Products load correctly
- Search works
- Category filtering works
- Price filtering works
- Product details open correctly
- Refreshing a product details URL works
- Invalid URLs show the Page Not Found screen
- Products can be added to the cart
- Quantity can be increased/decreased
- Items can be removed
- Cart survives page refresh
- Toast notifications appear correctly
- Desktop and mobile layouts work correctly

## 🔮 Future Improvements

- User authentication
- Product sorting
- Wishlist
- Checkout flow
- Payment integration
- Order history
- Backend database
- Admin dashboard
- Product reviews
- Advanced filtering
- Theme switching

## 👨‍💻 Author

**Dhruv Patel**

Built as a React + Tailwind CSS e-commerce project with a focus on modern Spatial UI design and reusable frontend architecture.

## 📄 License

This project is intended for educational and portfolio purposes.
