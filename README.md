<div align="center">

# 📝 Scribbly — Class Note Sharing Platform

**A full-stack, production-ready web application that enables university students to securely upload, discover, and download academic notes — built with a scalable REST API, JWT-based authentication, and cloud-native file storage.**

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-v18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN-3448C5?style=flat-square&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![Bcrypt](https://img.shields.io/badge/bcrypt-Password_Hashing-blue?style=flat-square)](https://www.npmjs.com/package/bcrypt)

</div>

---

## 📌 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Security Implementation](#security-implementation)
- [API Endpoints](#api-endpoints)
- [Project Development Flow](#project-development-flow)
- [Demo — API in Action](#demo--api-in-action)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Scalability & Production Considerations](#scalability--production-considerations)
- [Product Video](#Demo-walkthrough)

---

## Overview

**Scribbly** is a collaborative academic note-sharing platform designed for university students. It allows authenticated users to **upload** their lecture notes (PDF/images), **search** and **discover** notes shared by peers, and **download** them — all secured behind a stateless JWT authentication system.

The platform is built to serve a large number of concurrent users across multiple universities. Files are stored on **Cloudinary's CDN**, metadata is persisted in **MongoDB Atlas**, and all sensitive routes are protected by **JWT Bearer token authentication**.

> This project demonstrates end-to-end full-stack engineering: from designing a RESTful API with role-based access control, to building a responsive React frontend that consumes it.

---

## Key Features

| Feature | Description |
|---|---|
| 🔐 **Secure Authentication** | User registration & login with **bcrypt password hashing** (10 salt rounds) and **JWT tokens** (1hr expiry) |
| 🛡️ **Protected Routes** | All file operations (upload, download, search) require a valid JWT — enforced by a reusable auth middleware |
| ☁️ **Cloud File Storage** | Files are uploaded via **Multer** to a local temp directory, then streamed to **Cloudinary** CDN; temp files are cleaned up automatically |
| 🔍 **Smart Search** | Case-insensitive regex search across the notes library, with an "all notes" fallback |
| ⬇️ **Flexible Downloads** | Download notes by **MongoDB Object ID** or by **filename** — both via authenticated endpoints |
| 👤 **Role-Based Access Control** | Users carry roles (`user`, `admin`) encoded in their JWT, used to gate admin-only operations |
| 📊 **Note Metadata & Analytics** | Tracks downloads, likes, views, subject, semester, and tags per note for future feature development |
| 🧩 **Modular Architecture** | Backend split into Controllers, Models, Routes, Auth, and Utils layers — highly maintainable and extensible |

---

## Architecture Overview

```
┌────────────────────────────────────┐
│           React Frontend           │  (Vite + TypeScript + Radix UI)
│  Login / SignUp / Dashboard /      │
│  Notes Library / Upload / Profile  │
└────────────┬───────────────────────┘
             │  HTTP + Bearer Token
             ▼
┌────────────────────────────────────┐
│         Express.js REST API        │  (Node.js v18+, ES Modules)
│                                    │
│  ┌──────────┐  ┌────────────────┐  │
│  │  Public  │  │   Protected    │  │
│  │  Routes  │  │   Routes       │  │
│  │ /Register│  │ /api/*         │  │
│  │ /public  │  │   ↑            │  │
│  └──────────┘  │ JWT Middleware │  │
│                └────────────────┘  │
│                                    │
│  Controllers: User, Upload,        │
│  Download, File Search             │
└────────────┬───────────────────────┘
             │
     ┌───────┴────────┐
     ▼                ▼
┌─────────┐    ┌──────────────┐
│ MongoDB │    │  Cloudinary  │
│  Atlas  │    │     CDN      │
│(Metadata│    │   (Files)    │
│  Users) │    └──────────────┘
└─────────┘
```

---

## Tech Stack

### Backend
| Technology | Role |
|---|---|
| **Node.js** (ES Modules) | Runtime — async, event-driven server |
| **Express.js v5** | REST API framework with modular routing |
| **MongoDB Atlas** | Cloud-hosted NoSQL database |
| **Mongoose** | ODM for schema modeling and DB queries |
| **JSON Web Tokens (JWT)** | Stateless authentication & authorization |
| **bcrypt** | Secure password hashing with configurable salt rounds |
| **Multer** | Multipart file upload handling |
| **Cloudinary SDK** | Cloud storage and CDN delivery for files |
| **dotenv** | Environment variable management |
| **cors** | Cross-Origin Resource Sharing for frontend integration |

### Frontend
| Technology | Role |
|---|---|
| **React 18** | Component-based UI library |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Lightning-fast dev server and bundler |
| **Radix UI** | Accessible, unstyled component primitives |
| **Tailwind CSS** | Utility-first styling |
| **Lucide React** | Modern icon library |
| **React Hook Form** | Performant form state management |

---

## Security Implementation

Security was treated as a first-class concern throughout development. Here is how each layer is protected:

### 1. Password Hashing with bcrypt

Passwords are **never stored in plaintext**. On registration, the raw password is hashed using `bcrypt.hashSync()` with **10 salt rounds** before being written to the database. On login, `bcrypt.compareSync()` validates the attempt against the stored hash.

```js
// userController.js
const hashedPassword = bcrypt.hashSync(req.body.Password, 10);
```

> **bcrypt hash in action**
>
> <img width="720" height="638" alt="5  used bcrypt to hash the password" src="https://github.com/user-attachments/assets/455ac778-f0d0-4138-b55e-ecaca1f04382" />

&nbsp;

> **Password hashed during user registration**
>
> <img width="1430" height="913" alt="6  password hased in user registration" src="https://github.com/user-attachments/assets/917bb5bd-571e-4e00-9e5f-1e7b841896fd" />

&nbsp;

> **Hashed password saved in the database**
>
> <img width="977" height="368" alt="7  hashed password saved in the database" src="https://github.com/user-attachments/assets/1b57d653-5728-4db9-9ca2-a63841a3996a" />

---

### 2. JWT Token Issuance

On successful registration **and** login, a signed JWT is returned to the client. The token payload includes non-sensitive user context (email, name, role, university, year) and expires after **1 hour**.

```js
const token = jwt.sign(
  { email, firstName, lastName, role, university, year },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);
```

> **JWT token generated with user information**
>
> <img width="1427" height="909" alt="9  A token is generated that have users information" src="https://github.com/user-attachments/assets/5fefe715-49c3-4bcf-b35e-f84e7343450d" />

---

### 3. JWT Auth Middleware (Protected Routes)

A reusable `authenticate` middleware guards all `/api/*` routes. It accepts tokens from either the `Authorization: Bearer <token>` header (for uploads/searches) or as a `?token=` query parameter (for file downloads via browser redirect).

```js
// auth/authMiddleware.js
export function authenticate(req, res, next) {
  let token = req.headers["authorization"]?.replace("Bearer ", "")
               || req.query.token;
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Unauthorized or invalid token" });
    req.user = decoded;
    next();
  });
}
```

> **JWT authorization — protected upload route**
>
> <img width="1388" height="832" alt="10  JWT authorization for a protected route - upload" src="https://github.com/user-attachments/assets/3396502f-7cc7-4cf0-8a27-608de70e1c59" />

&nbsp;

> **Protected download route — no token provided**
>
> <img width="1379" height="926" alt="11  protected route - download without the login token" src="https://github.com/user-attachments/assets/db7e271c-2c59-41e6-97b2-572d906ccd15" />

&nbsp;

> **Protected download route — valid token provided**
>
> <img width="1438" height="962" alt="12  protected route-download action, when the login token given" src="https://github.com/user-attachments/assets/0fe4c54a-856f-4bc1-898d-3a99d3012f99" />

&nbsp;

> **Invalid token rejection**
>
> <img width="1380" height="958" alt="13  giving a invalid token " src="https://github.com/user-attachments/assets/df928fed-0d74-4174-bbb8-2f04a6b0950d" />

---

## API Endpoints

### Public Routes (No Auth Required)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/Register/users/new` | Register a new user |
| `POST` | `/Register/users/login` | Log in and receive a JWT |
| `GET` | `/public/files/recent` | Fetch recently uploaded notes (public preview) |

### Protected Routes (`Authorization: Bearer <token>` required)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/me` | Get the current authenticated user's profile |
| `POST` | `/api/upload` | Upload a note file (PDF/image) with metadata |
| `GET` | `/api/download/:id` | Download a note by its MongoDB Object ID |
| `GET` | `/api/downloadByName/:filename` | Download a note by its filename |
| `GET` | `/api/files/search/:key` | Search notes by keyword (regex, case-insensitive) |
| `GET` | `/api/files/recent` | Fetch recently uploaded notes (authenticated) |
| `GET` | `/api/files/:id` | Get a specific note's full metadata |

---

## Project Development Flow

The project was built in deliberate, iterative phases — following industry best practices:

```
Phase 1 — Database Design
  └── Designed MongoDB schemas for Users and Files
  └── Modelled relationships (uploaderEmail links File to User)
  └── Set up MongoDB Atlas cluster

Phase 2 — User Authentication System
  └── Built User registration endpoint with bcrypt password hashing
  └── Implemented Login with bcrypt.compareSync validation
  └── Integrated JWT signing on both Register and Login success
  └── Verified token payload correctness via REST client

Phase 3 — JWT Middleware & Route Protection
  └── Wrote reusable authenticate() middleware
  └── Applied middleware to all /api/* routes
  └── Tested: no token → 401, invalid token → 403, valid token → 200

Phase 4 — File Upload Pipeline
  └── Configured Multer for multipart/form-data (100MB limit)
  └── File type validation (PDF, JPEG, PNG, GIF only)
  └── Temp local storage → Cloudinary upload → temp file cleanup
  └── Saved full metadata to MongoDB (title, subject, semester, tags)

Phase 5 — Download & File Management
  └── Built downloadById and downloadByName controllers
  └── Set Content-Disposition headers to force browser download
  └── Implemented redirect to Cloudinary secure URL

Phase 6 — Search Functionality
  └── Implemented regex-based search across filenames (case-insensitive)
  └── Added "all files" fallback for empty/wildcard queries
  └── Added getRecentFiles for Dashboard display

Phase 7 — Frontend Integration
  └── Built React/TypeScript frontend with Vite
  └── Implemented auth state via localStorage + /api/me session check
  └── Wired all API calls with automatic Bearer token injection
  └── Built Dashboard, Notes Library, Upload, Profile, and Admin views
```

---

## Demo — API in Action

### User Registration & Authentication

> New user registered successfully**
>
> <img width="1436" height="957" alt="1  registered new user successfully" src="https://github.com/user-attachments/assets/6f2c4949-f1bc-4a34-b179-8f6ce21d00a2" />


&nbsp;

> **Login success with JWT returned**
>
> <img width="1434" height="951" alt="8  login user success" src="https://github.com/user-attachments/assets/e5fb49da-84c0-4c7a-b012-ad2089a6d172" />


---

### File Operations

> **File uploaded to Cloudinary successfully**
>
> <img width="1429" height="964" alt="2  File upload success" src="https://github.com/user-attachments/assets/4145edf9-5acb-4e26-9798-2d77adc3b71c" />


&nbsp;

> **Note downloaded by MongoDB ID**
>
> <img width="1443" height="915" alt="3  Note download by id" src="https://github.com/user-attachments/assets/26368dcc-a8ed-4356-8ba6-6852c6ec724c" />


&nbsp;

> **Note downloaded by filename**
>
> <img width="1380" height="928" alt="4  Notes download by name" src="https://github.com/user-attachments/assets/4e81eb83-ee56-445a-9310-a3c79c3b48ba" />


---

### Search

> **Search returning matching files**
>
> <img width="1386" height="913" alt="14  Searching function files working properly" src="https://github.com/user-attachments/assets/b5174abf-c193-4970-a21c-b1e11d84357d" />

&nbsp;

> **Search endpoint — protected route confirmed**
>
> <img width="1384" height="934" alt="15  Searching function protected route" src="https://github.com/user-attachments/assets/ab784d0d-013f-4668-b691-9c75e8a102bc" />

---

## Database Schema

### User Model (`Users` Collection)
```js
{
  FirstName:  String (required),
  LastName:   String (required),
  UserName:   String (required, unique),
  Email:      String (required, unique),
  Password:   String (required),           // bcrypt hashed — NEVER plaintext
  role:       String (default: "user"),    // "user" | "admin"
  isBlocked:  Boolean (default: false),
  University: String,
  Year:       String,
  img:        String (default: Cloudinary avatar URL)
}
```

### File Model (`Files` Collection)
```js
{
  filename:       String (required),   // Cloudinary public_id
  originalName:   String,
  url:            String (required),   // Cloudinary secure CDN URL
  size:           Number (required),   // bytes
  fileType:       String (required),   // "PDF" | "Image"

  title:          String (required),
  subject:        String (required),
  semester:       String (required),
  description:    String,
  tags:           [String],

  uploaderId:     String (required),   // user email (FK to Users)
  uploaderName:   String (required),
  uploaderEmail:  String,

  downloads:      Number (default: 0),
  likes:          Number (default: 0),
  views:          Number (default: 0),

  uploadedAt:     Date (default: now),
  updatedAt:      Date (auto-updated on save)
}
```

---
## Getting Started

### Prerequisites
- Node.js v18+
- npm v9+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account
- A [Cloudinary](https://cloudinary.com/) account

### 1. Clone the Repository
```bash
git clone https://github.com/IsuruIndrajith/Scribbly---class-note-sharing-platform.git
cd Scribbly---class-note-sharing-platform
```

### 2. Set Up the Backend
```bash
cd BackEnd
npm install
# Add your .env file (see Environment Variables section)
npm start
# Server starts on http://localhost:3000
```

### 3. Set Up the Frontend
```bash
cd ../Frontend
npm install
npm run dev
# App opens on http://localhost:5173
```

---

## Environment Variables

Create a `.env` file in the `BackEnd/` directory:

```env
# MongoDB Atlas connection string
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

# JWT signing secret (use a long, random string in production)
JWT_SECRET=your_super_secret_key_here

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## Folder Structure

```
Project/
├── BackEnd/
│   ├── auth/
│   │   └── authMiddleware.js         # JWT verification middleware
│   ├── controllers/
│   │   ├── userController.js         # Register, login, current user, delete
│   │   ├── NoteUploadController.js   # Multer → Cloudinary upload pipeline
│   │   ├── NoteDownloadController.js # Download by ID & name
│   │   ├── fileManageController.js   # Search, getById, getRecent
│   │   └── userManageController.js   # Admin user management
│   ├── models/
│   │   ├── Users.js                  # Mongoose User schema
│   │   └── FileModel.js              # Mongoose File schema
│   ├── routes/
│   │   ├── usersRouter.js            # /Register routes
│   │   ├── uploadRouter.js           # /api/upload
│   │   ├── downloadRouter.js         # /api/download routes
│   │   ├── fileRoute.js              # /api/files routes (protected)
│   │   ├── publicFileRoute.js        # /public routes (no auth)
│   │   └── MangeUserRouter.js        # Admin user routes
│   ├── utils/
│   │   └── cloudinary.js             # Cloudinary SDK config
│   ├── index.js                      # App entry, middleware, DB connection
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── App.tsx                   # Root: auth state, API calls, routing
    │   ├── components/
    │   │   ├── Layout.tsx
    │   │   ├── Dashboard.tsx
    │   │   ├── NotesLibrary.tsx
    │   │   ├── UploadNotes.tsx
    │   │   ├── NoteDetail.tsx
    │   │   ├── Profile.tsx
    │   │   ├── AdminPanel.tsx
    │   │   ├── Login.tsx
    │   │   └── SignUp.tsx
    │   ├── index.css
    │   └── main.tsx
    ├── vite.config.ts
    └── package.json
```
---

## Demo walkthrough

https://github.com/user-attachments/assets/49f8c57f-57bc-4c2d-8fb4-80bed4658f97

---

## Scalability & Production Considerations

Scribbly is architected with real-world scale in mind:

| Concern | Solution |
|---|---|
| **File Storage** | Cloudinary CDN — globally distributed, handles unlimited concurrent downloads without server load |
| **Database** | MongoDB Atlas — horizontally scalable, supports sharding and replica sets for high availability |
| **Stateless Auth** | JWT-based — no server-side session store required; scales seamlessly across multiple backend instances |
| **File Upload Safety** | Multer enforces 100MB size limits and MIME-type allowlists; temp files deleted post-upload |
| **Secret Management** | All credentials in `.env`, never committed to version control |
| **Role-Based Access** | Admin role encoded in JWT — ready for multi-tier permission expansion |
| **CORS Policy** | Configured to allow only known frontend origins — prevents unauthorized cross-origin requests |
| **Error Handling** | All controllers use try/catch with semantic HTTP status codes (400, 401, 403, 404, 500) |

> **Horizontal Scaling Path:** Because the API is stateless (JWT) and files are on Cloudinary, multiple Express instances can run behind a load balancer (e.g., AWS ELB, Nginx) without any shared session or filesystem dependency.

---

## Author

**Isuru Indrajith**  
Full-Stack Software Engineer | Aspiring DevOps Engineer

[![GitHub](https://img.shields.io/badge/GitHub-IsuruIndrajith-181717?style=flat-square&logo=github)](https://github.com/IsuruIndrajith)

---

<div align="center">

*Built with ☕ and a passion for clean, secure, scalable software engineering.*

</div>
