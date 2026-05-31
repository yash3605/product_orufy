# Productr - Product Management Dashboard

A full-stack product management application built with React.js, Node.js, Express.js, and MongoDB. Designed to match the provided Figma mockups with pixel-perfect accuracy.

## Live Demo

- **Frontend**: [product-orufy.vercel.app](https://product-orufy.vercel.app)
- **Backend API**: [product-orufy.onrender.com](https://product-orufy.onrender.com)

## Features

- **OTP-based Authentication** - Login with email and 6-digit OTP verification
- **Product Management** - Full CRUD operations (Create, Read, Update, Delete)
- **Publish/Unpublish** - Toggle product visibility status
- **Image Upload** - Upload multiple product images via Cloudinary
- **Search** - Search products by name, brand, or type
- **Responsive Design** - Pixel-perfect UI matching Figma designs
- **Toast Notifications** - Success/error feedback for all actions

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite + Tailwind CSS |
| Backend | Node.js + Express.js (v5) |
| Database | MongoDB Atlas + Mongoose |
| Authentication | JWT + OTP via Brevo Email API |
| File Upload | Multer + Cloudinary |
| Deployment | Vercel (Frontend) + Render (Backend) |

## Project Structure

```
product_orufy/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Header.jsx          # Top navigation bar
│   │   │   ├── Sidebar.jsx         # Left sidebar navigation
│   │   │   └── ProductCard.jsx     # Product card with actions
│   │   ├── pages/                   # Page components
│   │   │   ├── Login.jsx           # Email login page
│   │   │   ├── OTPVerify.jsx       # 6-digit OTP verification
│   │   │   ├── Dashboard.jsx       # Home with Published/Unpublished tabs
│   │   │   └── Products.jsx        # Products listing with search
│   │   ├── modals/                  # Modal components
│   │   │   ├── AddProductModal.jsx  # Add new product form
│   │   │   ├── EditProductModal.jsx # Edit existing product
│   │   │   └── DeleteConfirmModal.jsx # Delete confirmation
│   │   ├── services/
│   │   │   └── api.js              # Axios API configuration
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Authentication state management
│   │   ├── App.jsx                  # Routes and app setup
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles + DM Sans font
│   ├── vercel.json                   # Vercel deployment config
│   └── package.json
├── server/                          # Express backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── models/
│   │   ├── User.js                  # User model (email, OTP)
│   │   └── Product.js               # Product model
│   ├── routes/
│   │   ├── auth.js                  # Auth routes
│   │   └── products.js              # Product CRUD routes
│   ├── controllers/
│   │   ├── authController.js        # OTP send/verify logic
│   │   └── productController.js     # Product CRUD logic
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication middleware
│   ├── utils/
│   │   ├── sendOTP.js               # Brevo email sender
│   │   └── cloudinary.js            # Cloudinary image upload
│   ├── Procfile                      # Render deployment config
│   ├── .env.example                  # Environment variables template
│   └── server.js                     # Express server entry point
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account (free tier)
- Cloudinary account (free tier)
- Brevo account (free tier - 300 emails/day)

### Backend Setup

1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from template:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your credentials (see Environment Variables section below)

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## Environment Variables

### Backend (.env)

| Variable | Description | How to Get |
|----------|-------------|------------|
| `PORT` | Server port | Default: 5000 |
| `MONGODB_URI` | MongoDB connection string | MongoDB Atlas → Connect → Connect your application |
| `JWT_SECRET` | Secret for JWT tokens | Any random string (e.g., `your_secret_key_2024`) |
| `EMAIL_USER` | Your Gmail address | Your Gmail |
| `EMAIL_PASS` | Gmail App Password | Google Account → Security → 2-Step Verification → App Passwords |
| `BREVO_API_KEY` | Brevo API key | Brevo → Settings → API Keys → Generate |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Cloudinary Dashboard |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` for dev |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Frontend (.env - optional)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `/api` (uses proxy in dev) |

## OTP Email - Important Note

> **During development phase, OTP emails are sent via Brevo's free tier. The OTP will only work for the email address you used to sign up for Brevo.**

To enable OTP for any email:
1. Verify your own domain on Brevo (requires DNS access)
2. Or upgrade to a paid Brevo plan

For testing purposes, you can:
- Sign up for Brevo with the email you want to test with
- Or verify your domain (e.g., `yashpratapkul.dev`) on Brevo

## API Endpoints

### Auth Routes
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/auth/send-otp` | Send OTP to email | `{ email }` |
| POST | `/api/auth/verify-otp` | Verify OTP and get token | `{ email, otp }` |
| GET | `/api/auth/me` | Get current user | - |

### Product Routes (Protected - requires JWT)
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/api/products` | Get all products | - |
| GET | `/api/products/:id` | Get single product | - |
| POST | `/api/products` | Create product | `FormData` |
| PUT | `/api/products/:id` | Update product | `FormData` |
| DELETE | `/api/products/:id` | Delete product | - |
| PATCH | `/api/products/:id/toggle-publish` | Toggle publish status | - |
| GET | `/api/products/search?q=query` | Search products | - |

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repository
3. Configure:
   - Framework: **Vite**
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
5. Deploy

### Backend (Render)

1. Go to [render.com](https://render.com) → New Web Service
2. Connect GitHub repository
3. Configure:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add all environment variables from the table above
5. Deploy

### Database (MongoDB Atlas)

1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free M0 cluster
3. Go to **Security → Network Access** → Add IP: `0.0.0.0/0`
4. Go to **Security → Database Access** → Create database user
5. Go to **Deployment → Database** → Connect → Connect your application
6. Copy connection string and update `MONGODB_URI`

## Design Decisions

- **Font**: DM Sans for clean, modern typography matching Figma
- **Colors**: Navy blue (#1a1a6c) primary, orange (#f97316) accent
- **Layout**: Sidebar navigation with header breadcrumbs
- **Modals**: Centered overlays with proper form validation
- **Empty States**: Custom SVG icons with helpful messaging

## License

MIT
