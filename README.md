# Epic_Bloggo

# 📝 Full Stack Blog Platform

A modern, responsive blog platform built with **React** (frontend) and **Node.js + Express + MongoDB** (backend). Users can sign up, log in, create, edit, delete, and view blogs. Public users can view blog listings and details. The application is hosted on a cloud platform and supports full CRUD operations with user authentication.

---

## 🚀 Features

- ✅ User authentication (JWT-based) using email & password
- ✅ Create, read, update, and delete blog posts
- ✅ Public blog listing and detail pages (accessible to everyone)
- ✅ Private blog creation/editing/deletion (only by blog authors)
- ✅ Pagination on blog listing page
- ✅ Responsive design for desktop & mobile
- ✅ REST API built with Express.js & MongoDB

## 🧰 Tech Stack

| Layer       | Technology |
|-------------|------------|
| Frontend    | React + Tailwind CSS |
| Backend     | Node.js + Express |
| Auth        | JWT (JSON Web Token) |
| Database    | MongoDB (Mongoose) |
| Deployment  | Vercel (Frontend) + Render (Backend) |

---

## 🗂️ Pages

### 🔐 Authentication
- **Signup/Login Page** — users can register and log in using email and password.

### 📝 Blog Pages
- **Create Blog** — only available to logged-in users.
- **Blog Listing** — public page with blog previews, paginated.
- **Blog Detail** — full view of a single blog, public.
- **Edit/Delete Blog** — only shown to the author of the blog.

---

## 🔌 API Endpoints

### Auth Routes (`/api/auth`)
- `POST /signup` — Register new user
- `POST /login` — Authenticate user and return JWT

### Blog Routes (`/api/blogs`)
- `GET /` — List blogs (with pagination)
- `GET /:id` — View single blog
- `POST /` — Create blog (auth required)
- `PUT /:id` — Update blog (auth & ownership required)
- `DELETE /:id` — Delete blog (auth & ownership required)

---

## 🛠️ Installation & Running Locally

### 🔙 Backend

```bash
# Navigate to backend folder
cd server

# Install dependencies
npm install

# Create .env file and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

# Run server
npm start

### ⚛️ Frontend Setup

# Navigate to frontend folder
cd client

# Run server
npm start