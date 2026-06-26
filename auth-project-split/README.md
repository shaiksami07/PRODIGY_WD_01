# SecureAuth — Backend + Frontend Split

This project has been split from a monolithic Express+EJS app into a proper **backend API** and **React frontend**.

```
auth-project-split/
├── backend/          # Node.js / Express REST API (JWT auth)
└── frontend/         # React SPA (Vite + React Router)
```

---

## Backend (Port 5000)

Express REST API with JWT authentication and MongoDB Atlas.

### Stack
- Express, Mongoose, bcryptjs, jsonwebtoken, express-validator, cors

### Setup
```bash
cd backend
npm install
cp .env .env.local   # fill in your MongoDB URI and JWT secret
npm run dev
```

### API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/auth/me` | Bearer token | Get current user |
| GET | `/api/users/dashboard` | Bearer token | Dashboard data |
| GET | `/api/users/admin` | Bearer token (admin) | All users list |
| GET | `/api/health` | Public | Health check |

### Architecture
```
backend/
├── server.js              # Express app entry
├── config/db.js           # MongoDB connection
├── models/User.js         # Mongoose model
├── middleware/auth.js     # isAuthenticated, isAdmin (JWT)
├── controllers/
│   ├── authController.js
│   └── usersController.js
└── routes/
    ├── auth.js
    └── users.js
```

---

## Frontend (Port 5173)

React SPA with React Router, Axios, and Context API for auth state.

### Stack
- React 18, React Router v6, Axios, Vite

### Setup
```bash
cd frontend
npm install
npm run dev
```

### Pages & Routes

| Route | Component | Access |
|-------|-----------|--------|
| `/` | Home | Public |
| `/login` | Login | Public (redirects if logged in) |
| `/register` | Register | Public (redirects if logged in) |
| `/dashboard` | Dashboard | Protected |
| `/admin` | Admin | Admin only |

### Architecture
```
frontend/src/
├── api/index.js           # Axios instance + all API calls
├── context/AuthContext.jsx # Global auth state + JWT helpers
├── components/
│   ├── Navbar.jsx
│   └── PrivateRoute.jsx   # Route guard
└── pages/
    ├── Home.jsx
    ├── Login.jsx
    ├── Register.jsx
    ├── Dashboard.jsx
    └── Admin.jsx
```

---

## Key Changes from Original

| Before (monolith) | After (split) |
|---|---|
| EJS server-side rendering | React SPA |
| Session-based auth (MongoDB store) | JWT tokens (localStorage) |
| Single Express app on port 3000 | API on :5000, React on :5173 |
| Views mixed with server logic | Clean API/UI separation |
| `express-flash` for messages | React state for errors/feedback |
| `connect-mongo` session store | Stateless JWT — no session store needed |
