# MongoDB Atlas Setup Guide

Complete step-by-step guide to create a MongoDB Atlas cluster and connect it to your Node.js application.

## Prerequisites

- An email address (for account creation)
- A web browser
- Internet connection

## Step 1: Create MongoDB Atlas Account

1. **Go to MongoDB Atlas Website**
   - Visit: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Click on **"Try Free"** or **"Sign Up"** button (usually in the top right corner)

2. **Sign Up Options**
   - You can sign up with:
     - **Google account** (recommended - fastest)
     - **GitHub account**
     - **Email address** (create new account)

3. **Fill in Account Details**
   - If using email, fill in:
     - First Name
     - Last Name
     - Email Address
     - Password
   - Accept the Terms of Service and Privacy Policy
   - Click **"Create your Atlas account"** or **"Sign up"**

4. **Verify Email** (if using email signup)
   - Check your email inbox
   - Click the verification link
   - You'll be redirected to MongoDB Atlas

## Step 2: Create Your First Cluster

1. **Choose Deployment Type**
   - After logging in, you'll see a page asking "Where would you like to deploy your cluster?"
   - Select **"M0 FREE"** (Free tier - perfect for development)
   - Click **"Create a deployment"**

2. **Select Cloud Provider**
   - Choose a cloud provider:
     - **AWS** (Amazon Web Services)
     - **Azure** (Microsoft Azure)
     - **GCP** (Google Cloud Platform)
   - For free tier, it doesn't matter which one you choose
   - Recommended: **AWS** (most common)

3. **Select Region**
   - Choose a region closest to your location
   - For free tier, select a region that shows "FREE TIER AVAILABLE"
   - Examples:
     - **US East (N. Virginia)** - `us-east-1`
     - **Europe (Ireland)** - `eu-west-1`
     - **Asia Pacific (Mumbai)** - `ap-south-1`
   - Click **"Create cluster"**

4. **Wait for Cluster Creation**
   - MongoDB Atlas will create your cluster
   - This process takes **3-5 minutes**
   - You'll see a progress indicator
   - Once complete, you'll see "Cluster created" message

## Step 3: Create Database User

1. **Navigate to Database Access**
   - In the left sidebar, click **"Database Access"**
   - Or click **"Get Started"** if this is your first time

2. **Add New Database User**
   - Click **"Add New Database User"** button
   - Choose authentication method: **"Password"**

3. **Set Username and Password**
   - **Username:** Enter a username (e.g., `admin`, `myuser`, `appuser`)
   - **Password:** 
     - Click **"Autogenerate Secure Password"** (recommended)
     - **OR** Create your own strong password
     - **IMPORTANT:** Copy and save the password! You won't be able to see it again
   - Write down both username and password

4. **Set User Privileges**
   - Select **"Atlas admin"** (for full access) or **"Read and write to any database"**
   - For development, **"Atlas admin"** is fine
   - Click **"Add User"**

5. **Confirm User Creation**
   - You'll see a success message
   - The new user will appear in the Database Users list

## Step 4: Configure Network Access (Whitelist IP)

1. **Navigate to Network Access**
   - In the left sidebar, click **"Network Access"**
   - Or click **"Get Started"** if this's your first time

2. **Add IP Address**
   - Click **"Add IP Address"** button
   - You have three options:

   **Option A: Allow Access from Anywhere (Development Only)**
   - Click **"Allow Access from Anywhere"**
   - IP Address: `0.0.0.0/0`
   - **Warning:** This allows access from any IP address (only for development/testing)
   - Click **"Confirm"**

   **Option B: Add Current IP Address (Recommended for Production)**
   - Click **"Add Current IP Address"**
   - MongoDB Atlas will detect your current IP
   - Click **"Confirm"**

   **Option C: Add Specific IP Address**
   - Enter your IP address manually
   - Or enter IP range (e.g., `192.168.1.0/24`)

3. **Confirm IP Whitelist**
   - You'll see your IP address added to the whitelist
   - Status should be "Active"

## Step 5: Get Connection String

1. **Navigate to Clusters**
   - In the left sidebar, click **"Database"** or **"Clusters"**
   - You'll see your cluster listed

2. **Connect to Cluster**
   - Click **"Connect"** button on your cluster
   - A modal will open with connection options

3. **Choose Connection Method**
   - Select **"Connect your application"**
   - You'll see connection string options

4. **Select Driver and Version**
   - **Driver:** Select **"Node.js"**
   - **Version:** Select **"4.1 or later"** (or latest version)

5. **Copy Connection String**
   - You'll see a connection string like:
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Click **"Copy"** button to copy the connection string
   - **Important:** Replace `<username>` and `<password>` with your database user credentials

6. **Format Connection String**
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - If your password contains special characters, URL-encode them:
     - `@` becomes `%40`
     - `#` becomes `%23`
     - `$` becomes `%24`
     - `%` becomes `%25`
     - etc.

   **Example:**
   ```
   mongodb+srv://myuser:MyPassword123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Add Database Name to Connection String

1. **Modify Connection String**
   - Add your database name before the `?` in the connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority`

2. **Example Connection String**
   ```
   mongodb+srv://myuser:MyPassword123@cluster0.xxxxx.mongodb.net/crud-db?retryWrites=true&w=majority
   ```
   - Database name: `crud-db` (you can use any name you want)

## Step 7: Configure Your Node.js Application

1. **Create `.env` File**
   - In your `backend` directory, create a `.env` file
   - Copy from `env.example`:
     ```bash
     cp env.example .env
     ```

2. **Update `.env` File**
   - Open `.env` file
   - Update `MONGODB_URI` with your connection string:
     ```env
     PORT=5000
     MONGODB_URI=mongodb+srv://myuser:MyPassword123@cluster0.xxxxx.mongodb.net/crud-db?retryWrites=true&w=majority
     NODE_ENV=development
     ```

3. **Save the File**
   - Save the `.env` file
   - Make sure `.env` is in `.gitignore` (it should be already)

## Step 8: Test the Connection

1. **Start Your Node.js Application**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Check Connection**
   - If connected successfully, you'll see:
     ```
     MongoDB Connected: cluster0.xxxxx.mongodb.net
     Database: crud-db
     Server is running on port 5000
     ```

3. **If Connection Fails**
   - Check your connection string
   - Verify username and password are correct
   - Make sure IP address is whitelisted
   - Check internet connection
   - Verify database user has correct permissions

## Step 9: Verify Data in MongoDB Atlas

1. **View Collections**
   - Go to MongoDB Atlas dashboard
   - Click **"Database"** in the left sidebar
   - Click **"Browse Collections"** on your cluster
   - You should see your database and collections

2. **Test CRUD Operations**
   - Use your API to create items
   - Check MongoDB Atlas to see the data
   - Collections will be created automatically when you insert data

## Troubleshooting

### Connection Timeout
- **Problem:** Connection timeout error
- **Solution:** 
  - Check if your IP address is whitelisted
  - Verify your internet connection
  - Check if MongoDB Atlas cluster is running

### Authentication Failed
- **Problem:** Authentication failed error
- **Solution:**
  - Verify username and password are correct
  - Make sure password is URL-encoded if it contains special characters
  - Check if database user exists and has correct permissions

### Network Access Denied
- **Problem:** Network access denied error
- **Solution:**
  - Add your IP address to the whitelist
  - For development, you can use `0.0.0.0/0` (allows all IPs)

### Database Not Found
- **Problem:** Database not found error
- **Solution:**
  - MongoDB Atlas creates databases automatically
  - Make sure database name is in the connection string
  - Collections are created automatically when you insert data

## Security Best Practices

1. **Never Commit `.env` File**
   - Always keep `.env` in `.gitignore`
   - Never commit sensitive credentials to version control

2. **Use Strong Passwords**
   - Use autogenerated secure passwords
   - Store passwords securely (password manager)

3. **Restrict IP Access**
   - For production, only whitelist specific IP addresses
   - Don't use `0.0.0.0/0` in production

4. **Use Environment Variables**
   - Always use environment variables for sensitive data
   - Never hardcode credentials in your code

5. **Rotate Passwords Regularly**
   - Change database passwords periodically
   - Update connection strings when passwords change

## Next Steps

1. ✅ Cluster created
2. ✅ Database user created
3. ✅ Network access configured
4. ✅ Connection string obtained
5. ✅ Application configured
6. ✅ Connection tested

**You're now ready to use MongoDB Atlas with your Node.js application!**

## Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Connection String Format](https://docs.mongodb.com/manual/reference/connection-string/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

## Quick Reference

### Connection String Format
```
mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```

### Environment Variables
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### MongoDB Atlas Dashboard
- **Clusters:** [https://cloud.mongodb.com/v2](https://cloud.mongodb.com/v2)
- **Database Access:** Database Access → Add New Database User
- **Network Access:** Network Access → Add IP Address
- **Connect:** Clusters → Connect → Connect your application

