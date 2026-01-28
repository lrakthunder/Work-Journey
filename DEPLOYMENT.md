# 🚀 Hostinger Deployment Guide for WorkJourney

This guide will walk you through deploying your Next.js WorkJourney app on Hostinger's Node.js Web App hosting.

## ✅ Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] A Hostinger account with Business or Cloud hosting plan
- [ ] MySQL database credentials from Hostinger
- [ ] Your code pushed to GitHub (recommended) OR a `.zip` file ready
- [ ] Environment variables documented

## 📋 Step 1: Prepare Your Database on Hostinger

### 1.1 Create MySQL Database

1. Log into Hostinger hPanel
2. Navigate to **Databases** → **MySQL Databases**
3. Click **Create Database**
4. Name it: `work_journey` (or your choice)
5. Create a database user with a strong password
6. Save your credentials:
   - Database Name: `__________`
   - Database User: `__________`
   - Database Password: `__________`
   - Database Host: (usually `localhost` or provided by Hostinger)

### 1.2 Import Schema

1. Go to **phpMyAdmin** from hPanel
2. Select your `work_journey` database
3. Click **Import** tab
4. Upload `schema.sql` from the project root
5. Click **Go** to execute

✅ Your database is now ready!

## 📦 Step 2: Deploy via GitHub (Recommended)

### 2.1 Push to GitHub

```bash
cd "d:\Projects\Work Journey"
git init
git add .
git commit -m "Initial commit - Next.js migration"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/workjourney.git
git push -u origin main
```

### 2.2 Deploy on Hostinger

1. Log into Hostinger hPanel
2. Go to **Websites** → **Add Website**
3. Select **Node.js Apps**
4. Click **Import Git Repository**
5. Click **Authorize** to connect GitHub
6. Select your `workjourney` repository
7. Branch: `main`

### 2.3 Configure Build Settings

Hostinger should auto-detect Next.js. Verify these settings:

```
Build Command: npm run build
Start Command: npm start
Node Version: 20.x (or 18.x)
```

### 2.4 Add Environment Variables

In the deployment settings, add:

```env
DB_HOST=localhost
DB_USER=your_hostinger_db_user
DB_PASSWORD=your_hostinger_db_password
DB_NAME=work_journey
DB_PORT=3306
JWT_SECRET=generate-a-random-32-character-string-here
NODE_ENV=production
```

**Important:** Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2.5 Deploy!

1. Click **Deploy**
2. Wait 3-5 minutes for build to complete
3. Your app will be live at: `https://your-temporary-subdomain.hostingersite.com`

## 📤 Alternative: Deploy via File Upload

### 3.1 Prepare ZIP File

1. Delete `node_modules` folder (if exists)
2. Delete `.next` folder (if exists)
3. Create `.env` file with production values
4. Compress the entire project folder to `.zip`

### 3.2 Upload to Hostinger

1. Log into Hostinger hPanel
2. Go to **Websites** → **Add Website**
3. Select **Node.js Apps**
4. Click **Upload your website files**
5. Upload your `.zip` file
6. Configure build settings (see 2.3 above)
7. Add environment variables (see 2.4 above)
8. Click **Deploy**

## 🔗 Step 3: Connect Custom Domain (Optional)

Once deployed to a temporary domain:

1. Go to your website's dashboard in hPanel
2. Click **Manage**
3. Navigate to **Domain**
4. Click **Connect Domain**
5. Select your custom domain
6. Follow the DNS setup instructions

**Note:** If the domain is already added to hosting, you'll need to remove the existing website first.

## ✅ Step 4: Verify Deployment

### Test Your App

1. Visit your deployed URL
2. Try logging in with demo account:
   ```
   Email: demo@careerpulse.com
   Password: demo123
   ```
3. Test creating a new application
4. Verify database connectivity

### Common Issues & Solutions

#### ❌ Database Connection Error

**Solution:** Double-check environment variables, especially `DB_HOST`. On Hostinger, it might be `localhost` or a specific hostname.

#### ❌ JWT Token Invalid

**Solution:** Ensure `JWT_SECRET` is set correctly in environment variables.

#### ❌ Build Failed

**Solution:** Check deployment logs. Common issues:
- Missing dependencies: Ensure `package.json` is complete
- Node version mismatch: Use Node 18.x or 20.x

#### ❌ Application Not Starting

**Solution:** Verify start command is `npm start` and build completed successfully.

## 🔄 Updating Your App

### Via GitHub

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Hostinger will auto-deploy (if auto-deploy is enabled)
4. OR manually trigger deployment from hPanel

### Via File Upload

1. Make changes locally
2. Delete `node_modules` and `.next`
3. Create new `.zip` file
4. Upload through hPanel deployment interface
5. Trigger new deployment

## 📊 Monitoring

### View Deployment Logs

1. Go to your website in hPanel
2. Click **Deployment Details**
3. View build and runtime logs

### Database Management

1. Access **phpMyAdmin** from hPanel
2. Monitor database size and performance
3. Create backups regularly

## 🔒 Security Best Practices

1. **Never commit `.env`** - Add it to `.gitignore`
2. **Use strong JWT secret** - Generate a random 32+ character string
3. **Strong database password** - Use Hostinger's password generator
4. **Regular backups** - Export database weekly
5. **Update dependencies** - Run `npm audit fix` regularly

## 🎯 Performance Tips

1. Enable caching in Next.js config
2. Optimize images using Next.js Image component
3. Monitor database queries
4. Use connection pooling (already configured)
5. Enable HTTPS (automatic on Hostinger)

## 📞 Support

### Hostinger Support
- Live Chat: 24/7 available in hPanel
- Knowledge Base: https://www.hostinger.com/support

### Application Issues
- Check deployment logs in hPanel
- Review Node.js console output
- Test database connection via phpMyAdmin

## ✨ Success!

Your WorkJourney app is now live on Hostinger! 🎉

**Next Steps:**
- Share your app URL with users
- Set up a custom domain
- Configure automated backups
- Monitor usage and performance

---

**Deployed URL:** `_______________________________`

**Database:** `work_journey`

**Last Updated:** January 27, 2026
