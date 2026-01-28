# CareerPulse - Full Stack Job Tracker

Modern job application tracker with React frontend and Node.js backend.

## Quick Start

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm or yarn

### 1. Database Setup

```sql
CREATE DATABASE work_journey;
```

Or import the schema:
```bash
mysql -u root -p work_journey < backend/schema.sql
```

### 2. Backend Setup

```bash
cd backend
npm install

# Update .env with your credentials
cp .env.example .env

# Start backend server
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install

# Start frontend dev server
npm run dev
```

Frontend runs on: `http://localhost:3000`

## Features

- ✅ User authentication (register/login)
- ✅ Job application tracking
- ✅ Status management (Applied, Interview, Offer, Rejected)
- ✅ Beautiful UI with Tailwind CSS
- ✅ MySQL database persistence
- ✅ JWT authentication
- ✅ Real-time updates

## Project Structure

```
careerpulse/
├── frontend/          # React + Vite + TypeScript
│   ├── components/    # UI components
│   ├── services/      # API service layer
│   └── types.ts       # TypeScript types
└── backend/           # Node.js + Express + MySQL
    ├── src/
    │   ├── routes/    # API routes
    │   ├── services/  # Business logic
    │   └── db.ts      # Database connection
    └── .env           # Configuration
```

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/jobs` - Get user's jobs
- `POST /api/jobs` - Create/update job
- `DELETE /api/jobs/:id` - Delete job

## Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- Tailwind CSS (via CDN)

**Backend:**
- Node.js
- Express
- MySQL2
- JWT
- bcryptjs

## Database Schema

### users
- id, name, email, password (hashed), created_at

### jobs
- id, user_id, company_name, role, status, applied_date, follow_up_date, notes, location, salary

## Development

The backend auto-creates tables on first run. Simply ensure your MySQL database exists and credentials are correct in `.env`.

Demo account credentials:
- Email: `demo@careerpulse.com`
- Password: `demo123`
