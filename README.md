# 🔐 SecureAuth – MERN Authentication System

A full-stack authentication system built using the **MERN Stack** that provides secure user registration, login, JWT authentication, protected routes, and user profile management.

This project follows a clean architecture by separating the **React Frontend** and **Express Backend**, making it scalable, maintainable, and production-ready.

---

## 🚀 Features

- ✅ User Registration
- ✅ Secure Login Authentication
- ✅ JWT (JSON Web Token) Authentication
- ✅ Password Hashing using bcrypt
- ✅ Protected API Routes
- ✅ User Profile Retrieval
- ✅ Input Validation
- ✅ MongoDB Database Integration
- ✅ RESTful API Architecture
- ✅ React Frontend with React Router
- ✅ Axios API Integration
- ✅ Environment Variable Configuration
- ✅ Modular Folder Structure

---

# 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Vite
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- express-validator
- dotenv
- CORS

---

# 📂 Project Structure

```
SecureAuth/
│
├── backend/
│   ├── config/
│   │      db.js
│   │
│   ├── controllers/
│   │      authController.js
│   │      usersController.js
│   │
│   ├── middleware/
│   │      auth.js
│   │
│   ├── models/
│   │      User.js
│   │
│   ├── routes/
│   │
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │      components/
│   │      pages/
│   │      App.jsx
│   │      main.jsx
│   │
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# 🔑 Authentication Flow

```
User Registers
        │
        ▼
Password Hashed using bcrypt
        │
        ▼
Stored in MongoDB
        │
        ▼
User Login
        │
        ▼
JWT Token Generated
        │
        ▼
Token Stored on Client
        │
        ▼
Protected Routes
        │
        ▼
Token Verification Middleware
        │
        ▼
Authorized Access
```

---

# ⚙ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/SecureAuth.git
```

```
cd SecureAuth
```

---

## 2. Backend Setup

```
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run Backend

```bash
npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

## 3. Frontend Setup

```
cd frontend
```

Install dependencies

```bash
npm install
```

Start frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 📡 API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

---

## User

### Get Logged-in User

```
GET /api/users/me
```

Requires:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 🔒 Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected middleware
- Environment variables
- Input validation
- REST API best practices
- Secure authentication flow
- Modular architecture

---

# 🧠 What I Learned

During this project, I gained practical experience with:

- Building REST APIs
- Express Middleware
- MongoDB & Mongoose
- JWT Authentication
- Password Encryption
- React Routing
- Axios API Calls
- Authentication Flow
- Backend Architecture
- Environment Variables
- API Testing
- Error Handling

---

# 📈 Future Improvements

- Email Verification
- Forgot Password
- Password Reset
- Refresh Tokens
- OAuth Login (Google/GitHub)
- Profile Picture Upload
- Two-Factor Authentication (2FA)
- Role-Based Authentication (Admin/User)
- Docker Support
- Deployment on Render & Vercel

---

# 📷 Screenshots

Add screenshots here after deployment.

Example:

```
screenshots/
    login.png
    register.png
    dashboard.png
```

---

# 💻 Run Locally

Backend

```bash
cd backend
npm install
npm run dev
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 📌 Environment Variables

Backend

```env
PORT=

MONGO_URI=

JWT_SECRET=
```

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**SHAIK MOHAMMAD SAMI**

📧 Email: shaikmohamadsami@gmail.com

💼 LinkedIn:
www.linkedin.com/in/shaik-sami-9a4849414

💻 GitHub:
https://github.com/shaiksami07

⭐ If you found this project useful, don't forget to star the repository!
