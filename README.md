# Productr - Product Management Dashboard

A full-stack product management application built with React.js, Node.js, Express.js, and MongoDB.

## Features

- **OTP-based Authentication** - Login with email and OTP verification
- **Product Management** - Create, Read, Update, Delete products
- **Publish/Unpublish** - Toggle product visibility
- **Image Upload** - Upload multiple product images
- **Search** - Search products by name, brand, or type
- **Responsive Design** - Works on desktop and mobile

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + OTP (Nodemailer) |
| File Upload | Multer + Cloudinary |

## Project Structure

```
assignment_orufy/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── modals/            # Modal components
│   │   ├── services/          # API calls
│   │   ├── context/           # State management
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/                    # Express backend
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/
│   └── server.js
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- Gmail account (for OTP emails)

### Backend Setup

1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your credentials:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/productr
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

5. Start the server:
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

## API Endpoints

### Auth Routes
- `POST /api/auth/send-otp` - Send OTP to email
- `POST /api/auth/verify-otp` - Verify OTP and get token
- `GET /api/auth/me` - Get current user

### Product Routes (Protected)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `PATCH /api/products/:id/toggle-publish` - Toggle publish status
- `GET /api/products/search?q=query` - Search products

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT tokens |
| EMAIL_USER | Gmail address for OTP |
| EMAIL_PASS | Gmail app password |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name |
| CLOUDINARY_API_KEY | Cloudinary API key |
| CLOUDINARY_API_SECRET | Cloudinary API secret |

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import repository on Vercel
3. Set root directory to `client`
4. Deploy

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Set root directory to `server`
4. Add environment variables
5. Deploy

### Database (MongoDB Atlas)
1. Create account on MongoDB Atlas
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in environment variables

## License

MIT
