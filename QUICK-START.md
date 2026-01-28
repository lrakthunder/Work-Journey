# 🚀 Quick Start Guide

## ⚡ Get Running in 5 Minutes

### 1️⃣ Install
```bash
cd "d:\Projects\Work Journey"
npm install
```

### 2️⃣ Database
```bash
# Create database
mysql -u root -p
CREATE DATABASE work_journey;
exit

# Import schema
mysql -u root -p work_journey < schema.sql
```

### 3️⃣ Configure
```bash
# Create .env file
cp .env.example .env

# Edit with your details:
# DB_PASSWORD=your_mysql_password
# JWT_SECRET=random-32-character-string
```

### 4️⃣ Run
```bash
npm run dev
```

### 5️⃣ Test
- Open: http://localhost:3000
- Login: demo@careerpulse.com / demo123

---

## 🌐 Deploy to Hostinger

### Method 1: GitHub (Best)
1. Push to GitHub
2. Hostinger hPanel → Add Website → Node.js Apps
3. Import from GitHub
4. Add environment variables
5. Deploy!

### Method 2: ZIP Upload
1. Delete `node_modules` and `.next`
2. Create .env with production values
3. Zip entire folder
4. Hostinger hPanel → Upload ZIP
5. Deploy!

---

## 📋 Environment Variables

```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=work_journey
JWT_SECRET=your-secret-key
NODE_ENV=production
```

---

## 🔧 Common Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start           # Run production server

# Lint
npm run lint        # Check code quality
```

---

## ✅ Checklist Before Deploy

- [ ] Database created and schema imported
- [ ] `.env` file configured with production values
- [ ] Strong JWT secret generated
- [ ] Test login with demo account
- [ ] Test creating/editing applications
- [ ] Dependencies installed (`npm install`)
- [ ] Build successful (`npm run build`)

---

## 📚 Documentation

- **Full Setup:** README-NEXTJS.md
- **Deployment:** DEPLOYMENT.md
- **Migration Details:** MIGRATION-SUMMARY.md

---

## 🆘 Troubleshooting

### Can't connect to database
- Check DB_HOST, DB_USER, DB_PASSWORD in .env
- Verify MySQL is running
- Test connection: `mysql -u root -p`

### JWT errors
- Generate new JWT_SECRET
- Use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Build fails
- Delete `.next` and `node_modules`
- Run `npm install` again
- Check Node version (18.x or 20.x)

---

## 🎯 What You Get

✨ Beautiful job tracking UI
🔐 Secure authentication
📊 Dashboard with analytics
💾 MySQL database
🚀 Hostinger-ready
📱 Responsive design
🌱 Demo account included

---

**Need help?** Check the detailed guides or Hostinger's 24/7 support!
