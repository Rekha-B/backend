# Quick Deployment Guide

Fastest way to deploy your Node.js MongoDB API to the cloud.

## 🚀 Recommended: Railway (Easiest)

### Prerequisites
- GitHub account
- MongoDB Atlas connection string

### Steps

1. **Push code to GitHub**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy on Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Select `backend` directory (if repo has frontend/backend)

3. **Add Environment Variables**
   - Click "Variables" tab
   - Add:
     ```
     MONGODB_URI=your-mongodb-atlas-connection-string
     NODE_ENV=production
     ```

4. **Done!**
   - Railway auto-deploys
   - Get your URL: `https://your-app.railway.app`

## 🎯 Alternative: Render (Free Tier)

1. **Push code to GitHub** (same as above)

2. **Deploy on Render**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub
   - Click "New" → "Web Service"
   - Connect repository
   - Configure:
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Root Directory:** `backend` (if needed)

3. **Add Environment Variables**
   - Click "Environment"
   - Add:
     ```
     MONGODB_URI=your-mongodb-atlas-connection-string
     NODE_ENV=production
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Get URL: `https://your-app.onrender.com`

## 📋 Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB Atlas IP whitelist configured (add `0.0.0.0/0` for cloud)
- [ ] MongoDB connection string ready
- [ ] Environment variables prepared
- [ ] Tested locally with `npm run dev`

## 🔧 Environment Variables Needed

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
NODE_ENV=production
PORT=5000 (optional - platform sets this automatically)
```

## ✅ Post-Deployment

1. **Test your API:**
   ```bash
   curl https://your-app-url.com/api/items
   ```

2. **Check logs:**
   - Railway: Dashboard → Logs
   - Render: Dashboard → Logs

3. **Update MongoDB Atlas:**
   - Whitelist your platform's IP ranges
   - Or use `0.0.0.0/0` for development

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version
- Verify `package.json` has `start` script
- Check build logs

### App Crashes
- Verify environment variables
- Check MongoDB connection string
- Review application logs

### Database Connection Error
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user exists

## 📚 Full Documentation

For detailed deployment guides, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🎉 You're Done!

Your API is now live in the cloud! 🚀

