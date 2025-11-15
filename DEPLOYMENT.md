# Backend Deployment Guide

Complete guide to deploy your Node.js MongoDB CRUD API to various cloud platforms.

## Table of Contents

1. [Railway](#railway-recommended)
2. [Render](#render)
3. [Heroku](#heroku)
4. [DigitalOcean App Platform](#digitalocean-app-platform)
5. [AWS Elastic Beanstalk](#aws-elastic-beanstalk)
6. [Vercel](#vercel-serverless)

---

## Railway (Recommended)

Railway is one of the easiest platforms to deploy Node.js applications with MongoDB.

### Prerequisites
- GitHub account
- MongoDB Atlas account (or Railway can provision MongoDB)

### Step 1: Prepare Your Application

1. **Ensure your code is on GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Create `Procfile`** (already created in project)
   ```
   web: node server.js
   ```

### Step 2: Deploy on Railway

1. **Sign up for Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `backend` directory

3. **Configure Environment Variables**
   - Go to "Variables" tab
   - Add environment variables:
     ```
     PORT=5000
     MONGODB_URI=your-mongodb-atlas-connection-string
     NODE_ENV=production
     ```

4. **Deploy**
   - Railway will automatically detect Node.js
   - It will run `npm install` and `npm start`
   - Your app will be deployed!

5. **Get Your URL**
   - Railway provides a URL like: `https://your-app.railway.app`
   - You can add a custom domain in settings

### Railway MongoDB (Optional)

Railway can provision MongoDB for you:
1. Click "New" → "Database" → "Add MongoDB"
2. Railway will create a MongoDB instance
3. Use the connection string from Railway in your environment variables

---

## Render

Render offers free tier hosting for Node.js applications.

### Step 1: Prepare Your Application

1. **Ensure your code is on GitHub**

2. **Create `render.yaml`** (optional, for configuration)
   ```yaml
   services:
     - type: web
       name: nodejs-mongodb-api
       env: node
       buildCommand: npm install
       startCommand: npm start
       envVars:
         - key: NODE_ENV
           value: production
         - key: MONGODB_URI
           fromDatabase:
             name: mongodb
             property: connectionString
   ```

### Step 2: Deploy on Render

1. **Sign up for Render**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the repository and branch

3. **Configure Service**
   - **Name:** Your app name
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `backend` (if your repo has frontend/backend)

4. **Add Environment Variables**
   - Click "Environment"
   - Add:
     ```
     NODE_ENV=production
     MONGODB_URI=your-mongodb-atlas-connection-string
     PORT=10000 (Render sets this automatically, but you can specify)
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy your app
   - Get your URL: `https://your-app.onrender.com`

### Render MongoDB (Optional)

1. Click "New" → "MongoDB"
2. Create a MongoDB instance
3. Get connection string from Render
4. Use it in your environment variables

---

## Heroku

Heroku is a popular platform for deploying Node.js applications.

### Step 1: Install Heroku CLI

```bash
# Windows (using winget)
winget install Heroku.HerokuCLI

# Or download from https://devcenter.heroku.com/articles/heroku-cli
```

### Step 2: Prepare Your Application

1. **Create `Procfile`** (already created)
   ```
   web: node server.js
   ```

2. **Update `package.json`** (already done)
   ```json
   {
     "scripts": {
       "start": "node server.js"
     }
   }
   ```

### Step 3: Deploy on Heroku

1. **Login to Heroku**
   ```bash
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your-mongodb-atlas-connection-string
   ```

4. **Deploy**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a your-app-name
   git push heroku main
   ```

5. **Open Your App**
   ```bash
   heroku open
   ```

### Heroku MongoDB (Optional)

1. Add MongoDB addon:
   ```bash
   heroku addons:create mongolab:sandbox
   ```

2. Get connection string:
   ```bash
   heroku config:get MONGODB_URI
   ```

---

## DigitalOcean App Platform

DigitalOcean offers simple deployment with App Platform.

### Step 1: Prepare Your Application

1. **Ensure your code is on GitHub**

2. **Create `.do/app.yaml`** (optional)
   ```yaml
   name: nodejs-mongodb-api
   services:
     - name: api
       github:
         repo: YOUR_USERNAME/YOUR_REPO
         branch: main
         deploy_on_push: true
       source_dir: /backend
       build_command: npm install
       run_command: npm start
       environment_slug: node-js
       instance_count: 1
       instance_size_slug: basic-xxs
       envs:
         - key: NODE_ENV
           value: production
         - key: MONGODB_URI
           value: ${MONGODB_URI}
           scope: RUN_TIME
   ```

### Step 2: Deploy on DigitalOcean

1. **Sign up for DigitalOcean**
   - Go to [digitalocean.com](https://www.digitalocean.com)
   - Sign up for an account

2. **Create App**
   - Go to "Apps" → "Create App"
   - Connect your GitHub repository
   - Select repository and branch

3. **Configure App**
   - **Type:** Web Service
   - **Source Directory:** `backend`
   - **Build Command:** `npm install`
   - **Run Command:** `npm start`

4. **Add Environment Variables**
   - Go to "Environment Variables"
   - Add:
     ```
     NODE_ENV=production
     MONGODB_URI=your-mongodb-atlas-connection-string
     ```

5. **Deploy**
   - Click "Create Resources"
   - DigitalOcean will build and deploy
   - Get your URL: `https://your-app.ondigitalocean.app`

---

## AWS Elastic Beanstalk

AWS Elastic Beanstalk simplifies AWS deployment.

### Step 1: Install AWS CLI

```bash
# Windows
winget install Amazon.AWSCLI
```

### Step 2: Prepare Your Application

1. **Create `.ebextensions/nodecommand.config`**
   ```
   option_settings:
     aws:elasticbeanstalk:container:nodejs:
       NodeCommand: "npm start"
   ```

2. **Create `.platform/hooks/postdeploy/00_npm_install.sh`**
   ```bash
   #!/bin/bash
   cd /var/app/current
   npm install --production
   ```

### Step 3: Deploy on AWS

1. **Initialize EB**
   ```bash
   cd backend
   eb init
   ```

2. **Create Environment**
   ```bash
   eb create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   eb setenv NODE_ENV=production MONGODB_URI=your-connection-string
   ```

4. **Deploy**
   ```bash
   eb deploy
   ```

5. **Open App**
   ```bash
   eb open
   ```

---

## Vercel (Serverless)

Vercel can deploy Node.js APIs as serverless functions.

### Step 1: Prepare Your Application

1. **Create `vercel.json`**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ],
     "env": {
       "MONGODB_URI": "@mongodb_uri"
     }
   }
   ```

### Step 2: Deploy on Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd backend
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add MONGODB_URI
   vercel env add NODE_ENV
   ```

5. **Production Deploy**
   ```bash
   vercel --prod
   ```

---

## Environment Variables for All Platforms

Make sure to set these environment variables:

```env
NODE_ENV=production
MONGODB_URI=your-mongodb-atlas-connection-string
PORT=5000 (or let platform set it automatically)
```

## MongoDB Atlas Configuration

For all deployments, use MongoDB Atlas:

1. **Whitelist Platform IPs**
   - Go to MongoDB Atlas → Network Access
   - Add IP: `0.0.0.0/0` (allows all IPs)
   - Or add specific platform IP ranges

2. **Connection String**
   - Use your MongoDB Atlas connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority`

## Testing Your Deployment

After deployment, test your API:

```bash
# Get all items
curl https://your-app-url.com/api/items

# Create an item
curl -X POST https://your-app-url.com/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Item",
    "price": 99.99,
    "quantity": 10
  }'
```

## Monitoring and Logs

### Railway
- View logs in Railway dashboard
- Click on your service → "Logs"

### Render
- View logs in Render dashboard
- Click on your service → "Logs"

### Heroku
```bash
heroku logs --tail
```

### DigitalOcean
- View logs in App Platform dashboard
- Go to "Runtime Logs"

## Troubleshooting

### Build Fails
- Check Node.js version compatibility
- Verify all dependencies in `package.json`
- Check build logs in platform dashboard

### Application Crashes
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check application logs

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has correct permissions

### Port Issues
- Some platforms set PORT automatically
- Use `process.env.PORT || 5000` in your code (already done)

## Recommended Platforms

1. **Railway** - Easiest, great for beginners
2. **Render** - Free tier, simple setup
3. **Heroku** - Popular, well-documented
4. **DigitalOcean** - Good balance of features
5. **AWS** - Enterprise-grade, more complex

## Cost Comparison

- **Railway:** Free tier available, then pay-as-you-go
- **Render:** Free tier available, then $7/month+
- **Heroku:** Free tier removed, $7/month+
- **DigitalOcean:** $5/month minimum
- **AWS:** Pay-as-you-go, can be expensive

## Next Steps

1. Choose a platform
2. Follow the deployment steps
3. Set up MongoDB Atlas
4. Configure environment variables
5. Deploy and test
6. Set up custom domain (optional)
7. Monitor and maintain

