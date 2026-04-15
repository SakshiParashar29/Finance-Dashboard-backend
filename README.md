# Finance Data Processing and Access Control API

A backend system for a finance dashboard that supports user role management,
financial records, dashboard analytics, and role-based access control.
Built with Node.js, Express, and MongoDB.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| express-rate-limit | Rate limiting |

---

## Project Structure
```
Zorvyn/
├── src/
│   ├── config/
│   │   └── db.js                      # MongoDB connection
│   ├── models/
│   │   ├── User.js                    # User schema
│   │   └── Transaction.js             # Transaction schema
│   ├── routes/
│   │   ├── auth-routes.js             # /api/auth
│   │   ├── user-routes.js             # /api/users
│   │   ├── transaction-routes.js      # /api/transactions
│   │   └── dashboard-routes.js        # /api/dashboard
│   ├── controllers/
│   │   ├── auth-controller.js         # register, login
│   │   ├── user-controller.js         # user management
│   │   ├── transaction-controller.js  # CRUD + filtering
│   │   └── dashboard-controller.js    # analytics
│   ├── middleware/
│   │   ├── auth-middleware.js         # JWT verification
│   │   ├── role-middleware.js         # role-based access
│   │   └── rate-limiter.js            # rate limiter
│   └── server.js                      # Entry point
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account or local MongoDB

### Installation

**1. Clone the repository:**
```bash
git clone [https://github.com/SakshiParashar29/zorvyn-backend.git](https://github.com/SakshiParashar29/Zorvyn-backend-assignment.git)
cd Zorvyn
```

**2. Install dependencies:**
```bash
npm install
```

**3. Create `.env` file in root:**
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
```

**4. Start the server:**
```bash
# development
npm run dev

# production
npm start
```

---

## Roles and Permissions

| Action | Viewer | Analyst | Admin |
|--------|--------|---------|-------|
| Get own profile | ✅ | ✅ | ✅ |
| Dashboard summary | ✅ | ✅ | ✅ |
| Recent activity | ✅ | ✅ | ✅ |
| View transactions | ❌ | ✅ | ✅ |
| Category totals | ❌ | ✅ | ✅ |
| Monthly/Weekly trends | ❌ | ✅ | ✅ |
| Create transaction | ❌ | ❌ | ✅ |
| Update transaction | ❌ | ❌ | ✅ |
| Delete transaction | ❌ | ❌ | ✅ |
| Manage users | ❌ | ❌ | ✅ |

---

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/signup` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login and get token |

### Users
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/users/profile` | All roles | Get own profile |
| GET | `/api/users/all` | Admin | Get all users |
| GET | `/api/users/:id` | Admin | Get user by ID |
| PATCH | `/api/users/role/:id` | Admin | Update user role |
| PATCH | `/api/users/deactivate/:id` | Admin | Deactivate user |
| PATCH | `/api/users/activate/:id` | Admin | Activate user |

### Transactions
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/transactions/create` | Admin | Create transaction |
| GET | `/api/transactions/all` | Analyst, Admin | Get all transactions |
| GET | `/api/transactions/:id` | Analyst, Admin | Get by ID |
| PUT | `/api/transactions/:id` | Admin | Update transaction |
| DELETE | `/api/transactions/:id` | Admin | Soft delete |

### Dashboard
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/dashboard/summary` | All roles | Income, expense, balance |
| GET | `/api/dashboard/recent` | All roles | Last 10 transactions |
| GET | `/api/dashboard/categories` | Analyst, Admin | Category totals |
| GET | `/api/dashboard/trends/monthly` | Analyst, Admin | Monthly trends |
| GET | `/api/dashboard/trends/weekly` | Analyst, Admin | Weekly trends |

---

## Filtering and Pagination
```
GET /api/transactions?type=income
GET /api/transactions?category=Salary
GET /api/transactions?startDate=2026-01-01&endDate=2026-01-31
GET /api/transactions?page=1&limit=10
GET /api/transactions?type=expense&category=Food&page=1&limit=5
```

| Parameter | Description |
|-----------|-------------|
| `type` | Filter by income or expense |
| `category` | Filter by category name |
| `startDate` | Filter from this date |
| `endDate` | Filter until this date |
| `page` | Page number (default: 1) |
| `limit` | Results per page (default: 10) |

---

## Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <your_token>
```

---

## Features Implemented

- ✅ User registration and login with JWT
- ✅ Role-based access control (Viewer, Analyst, Admin)
- ✅ Financial records CRUD
- ✅ Record filtering by type, category, date range
- ✅ Pagination for transaction listing
- ✅ Soft delete for transactions
- ✅ Dashboard summary (income, expense, net balance)
- ✅ Category wise totals
- ✅ Monthly and weekly trends
- ✅ Recent activity feed
- ✅ Input validation and error handling
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Password hashing with bcrypt

---

## Assumptions Made

- Default role is Viewer if not specified during registration
- Admin cannot deactivate their own account
- Admin cannot change their own role
- Soft delete used for transactions to preserve financial data integrity
- Amount must always be a positive number
- Transaction type stored in lowercase (income/expense)
- JWT token expires in 7 days

---

## Error Response Format
```json
{
    "success": false,
    "message": "Error description here"
}
```

## Success Response Format
```json
{
    "success": true,
    "message": "Operation description",
    "data": {}
}
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 3000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET_KEY` | Secret key for JWT signing |

---

## API Documentation

[View Full API Documentation](https://www.postman.com/speeding-desert-881535/zorvyn-api-documentation)



