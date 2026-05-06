# SkillCast

> A community-driven platform where people share and discover skills. Connect with talented people in your community, learn what you don't know, and teach what you do.

![SkillCast](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18-blue) ![Node](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)

---

## ✨ Features

- 🔐 **Auth** — Sign up, login and logout with JWT authentication
- 📋 **Listings** — Create, browse, edit and delete skill listings
- 🔍 **Search & Filter** — Real-time search by title and category filter
- ⭐ **Reviews** — Leave star ratings and comments on listings
- 💬 **Contact** — Reach instructors via Email, WhatsApp or Discord
- 👤 **Profiles** — Public profile pages with stats and listings
- 📊 **Dashboard** — Manage your own listings in one place
- ⚙️ **Settings** — Update profile, change password or delete account
- 📱 **Responsive** — Works on mobile and desktop

---

## 🛠 Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 18 | UI framework |
| React Router | Client-side routing |
| Axios | HTTP requests |
| React Icons | Icon library |
| Vite | Build tool |

### Backend
| Tech | Purpose |
|---|---|
| Node.js | Runtime |
| Express | Web framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |

---

## 📁 Project Structure

```
skillcast/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ListingCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Listing.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── AddListing.jsx
│   │   │   ├── EditListing.jsx
│   │   │   ├── Login.jsx
│   │   │   └── SignUp.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── styles/
│   └── public/
└── backend/
    ├── models/
    │   ├── User.js
    │   ├── Listing.js
    │   └── Review.js
    ├── routes/
    │   ├── auth.js
    │   ├── listings.js
    │   └── reviews.js
    ├── middleware/
    │   └── auth.js
    └── server.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Git

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/skillcast.git
cd skillcast
```

### 2. Set up the backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

Start the backend:
```bash
npm run dev
```

### 3. Set up the frontend
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` folder:
```
VITE_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```

### 4. Open the app
```
http://localhost:5173
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | No | Create account |
| POST | `/api/auth/login` | No | Login |
| GET | `/api/auth/me` | Yes | Get current user |
| GET | `/api/auth/user/:id` | No | Get public profile |
| PUT | `/api/auth/update` | Yes | Update profile |
| DELETE | `/api/auth/delete` | Yes | Delete account |

### Listings
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/listings` | No | Get all listings |
| GET | `/api/listings/:id` | No | Get one listing |
| POST | `/api/listings` | Yes | Create listing |
| PUT | `/api/listings/:id` | Yes | Update listing |
| DELETE | `/api/listings/:id` | Yes | Delete listing |

### Reviews
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/reviews/:listingId` | No | Get reviews for listing |
| POST | `/api/reviews/:listingId` | Yes | Add a review |

---

## 🗄 Database Models

### User
```js
{
  name: String,
  email: String (unique),
  password: String (hashed),
  isPro: Boolean,
  avatar: String,
  createdAt: Date
}
```

### Listing
```js
{
  title: String,
  description: String,
  category: String,
  skills: [String],
  owner: ObjectId (ref: User),
  isFeatured: Boolean,
  contact: {
    email: String,
    whatsapp: String,
    discord: String
  },
  createdAt: Date
}
```

### Review
```js
{
  listing: ObjectId (ref: Listing),
  author: ObjectId (ref: User),
  rating: Number (1-5),
  comment: String,
  createdAt: Date
}
```

---

## 🔮 Roadmap

- [ ] Stripe payments for Pro badge
- [ ] In-app messaging between users
- [ ] Email notifications
- [ ] Advanced search with location
- [ ] Mobile app (React Native)

---

## 👨‍💻 Author

Built by **erycpc** — learning full-stack development one project at a time.

- GitHub: [@yourusername](https://github.com/erycpc)

---

## 📄 License

Made by erycpc
