# WorkJourney - Next.js Job Application Tracker

A modern, full-stack job application tracking system built with Next.js 14, now optimized for deployment on Hostinger's Node.js hosting.

## 🚀 What Changed?

This project has been **migrated from a separate frontend + backend architecture** to a **unified Next.js application** to meet Hostinger's Node.js Web App hosting requirements.

### Migration Summary:
- ✅ Combined React frontend and Express backend into Next.js
- ✅ Converted Express API routes to Next.js API routes
- ✅ Migrated all components to Next.js app directory structure
- ✅ Maintained MySQL database integration
- ✅ Preserved all original features and UI design

## 🎯 Features

- 📊 **Dashboard Overview** - Visualize your job search progress
- 🌱 **Application Tracking** - Track applications from submission to offer
- 🤝 **Interview Management** - Keep tabs on interview stages
- ✨ **Offer Tracking** - Organize your job offers
- 🍃 **Status Management** - Manage closed/rejected applications
- 🔐 **User Authentication** - Secure login with JWT tokens
- 💾 **MySQL Database** - Reliable data persistence

## 📋 Prerequisites

- Node.js 18+ or 20+
- MySQL 8.0+
- npm or yarn

## 🛠️ Installation

### 1. Clone or Download

```bash
cd "Work Journey"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

Create your MySQL database:

```sql
CREATE DATABASE work_journey;
```

Or import the schema from the backend folder:

```bash
mysql -u root -p work_journey < backend/schema.sql
```

### 4. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=work_journey

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=3000
NODE_ENV=development
```

## 🚀 Running the App

### Development Mode

```bash
npm run dev
```

The app will be available at: `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## 📦 Deployment on Hostinger

This Next.js app is now compatible with Hostinger's Node.js Web App hosting!

### Option 1: Deploy via GitHub

1. Push your code to a GitHub repository
2. In Hostinger hPanel, go to **Websites** → **Add Website**
3. Select **Node.js Apps**
4. Choose **Import Git Repository**
5. Authorize and select your repository
6. Hostinger will auto-detect Next.js configuration
7. Add your environment variables in the deployment settings
8. Click **Deploy**

### Option 2: Deploy via File Upload

1. Compress your project folder as `.zip`
2. In Hostinger hPanel, go to **Websites** → **Add Website**
3. Select **Node.js Apps**
4. Choose **Upload your website files**
5. Upload your `.zip` file
6. Configure environment variables
7. Click **Deploy**

### Important: Database Setup on Hostinger

You'll need to set up your MySQL database in Hostinger:

1. Create a MySQL database in hPanel
2. Import your schema using phpMyAdmin
3. Update `.env` with Hostinger's database credentials

## 🗂️ Project Structure

```
Work Journey/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (backend)
│   │   ├── auth/         # Authentication endpoints
│   │   └── jobs/         # Job management endpoints
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main app page
├── components/            # React components
│   ├── ApplicationList.tsx
│   ├── Auth.tsx
│   ├── Dashboard.tsx
│   ├── JobModal.tsx
│   └── Layout.tsx
├── lib/                   # Server-side utilities
│   ├── authService.ts    # Authentication logic
│   ├── db.ts             # Database connection
│   └── jobService.ts     # Job CRUD operations
├── types/                 # TypeScript types
│   └── index.ts
├── .env.example          # Environment template
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind CSS config
└── tsconfig.json         # TypeScript config
```

## 🔑 Demo Account

```
Email: demo@careerpulse.com
Password: demo123
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MySQL 8.0
- **Authentication:** JWT, bcryptjs
- **Hosting:** Optimized for Hostinger Node.js Web Apps

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Jobs
- `GET /api/jobs` - Get all jobs for user
- `POST /api/jobs` - Create or update job
- `DELETE /api/jobs/[id]` - Delete job

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Original design inspired by modern job tracking applications
- Built to help job seekers stay organized during their career journey

---

**Note:** The old `frontend/` and `backend/` folders are preserved for reference but are no longer used. The entire application now runs as a unified Next.js app.
