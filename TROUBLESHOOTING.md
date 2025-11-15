# Troubleshooting Guide

Common issues and solutions for the Node.js MongoDB API.

## Error: MONGODB_URI is undefined

### Problem
```
Error: The `uri` parameter to `openUri()` must be a string, got "undefined".
```

### Solutions

#### 1. Check if .env file exists
```bash
# In backend directory
ls -la .env  # Linux/Mac
dir .env     # Windows
```

#### 2. Create .env file if missing
```bash
# Copy from example
cp env.example .env

# Or create manually
touch .env   # Linux/Mac
# Windows: Create .env file in backend directory
```

#### 3. Verify .env file location
The `.env` file must be in the **backend** directory (same level as `server.js`):
```
backend/
├── .env          ← Must be here
├── server.js
├── package.json
└── ...
```

#### 4. Check .env file content
Open `.env` file and verify it contains:
```env
MONGODB_URI=mongodb://localhost:27017/crud-db
PORT=5000
NODE_ENV=development
```

**Important:** 
- No spaces around `=`
- No quotes needed (unless value contains spaces)
- No trailing spaces

#### 5. For MongoDB Atlas
If using MongoDB Atlas, update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```

**Replace:**
- `username` - Your MongoDB Atlas username
- `password` - Your MongoDB Atlas password
- `cluster.mongodb.net` - Your cluster URL
- `database-name` - Your database name (e.g., `crud-db`)

#### 6. Restart the server
After updating `.env`, restart your server:
```bash
# Stop the server (Ctrl+C)
# Then start again
npm run dev
```

#### 7. Verify environment variable is loaded
Add this temporarily to `server.js` to debug:
```javascript
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'NOT SET');
```

## MongoDB Connection Errors

### Connection Timeout
**Problem:** Connection timeout when connecting to MongoDB

**Solutions:**
1. **Local MongoDB:**
   - Make sure MongoDB is running
   - Check: `mongod` process is running
   - Verify port 27017 is not blocked

2. **MongoDB Atlas:**
   - Check IP whitelist in MongoDB Atlas
   - Add your IP address or `0.0.0.0/0` for all IPs
   - Verify connection string is correct

### Authentication Failed
**Problem:** Authentication failed error

**Solutions:**
1. Verify username and password in connection string
2. Check if database user exists in MongoDB Atlas
3. URL-encode special characters in password:
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`
   - `%` → `%25`

### Network Access Denied
**Problem:** Network access denied error

**Solutions:**
1. Go to MongoDB Atlas → Network Access
2. Add your IP address
3. Or add `0.0.0.0/0` for development (allows all IPs)

## Port Already in Use

### Problem
```
Error: listen EADDRINUSE: address already in use :::5000
```

### Solutions

#### 1. Change PORT in .env
```env
PORT=5001
```

#### 2. Find and kill process using port
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill
```

#### 3. Use different port
Update `.env`:
```env
PORT=3000
```

## Module Not Found Errors

### Problem
```
Error: Cannot find module 'express'
```

### Solutions

#### 1. Install dependencies
```bash
cd backend
npm install
```

#### 2. Check package.json
Verify all dependencies are listed in `package.json`

#### 3. Delete node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

## Build/Deployment Issues

### Environment Variables Not Set in Production

**Problem:** App works locally but fails in production

**Solutions:**
1. Set environment variables in your hosting platform:
   - Railway: Variables tab
   - Render: Environment tab
   - Heroku: `heroku config:set MONGODB_URI=...`
2. Verify `.env` is in `.gitignore` (should not be committed)
3. Set variables in platform dashboard, not in `.env` file

## Common .env File Mistakes

### ❌ Wrong
```env
MONGODB_URI = mongodb://localhost:27017/crud-db  # Spaces around =
MONGODB_URI="mongodb://localhost:27017/crud-db"   # Quotes not needed
MONGODB_URI=mongodb://localhost:27017/crud-db     # Trailing space
```

### ✅ Correct
```env
MONGODB_URI=mongodb://localhost:27017/crud-db
```

## Debugging Steps

1. **Check .env file exists and is in correct location**
2. **Verify .env file content** (no spaces, correct format)
3. **Restart server** after changing .env
4. **Check console output** for error messages
5. **Verify MongoDB is running** (local) or connection string is correct (Atlas)
6. **Check IP whitelist** (for MongoDB Atlas)

## Getting Help

If you're still having issues:

1. Check the error message carefully
2. Verify all steps in this guide
3. Check MongoDB Atlas dashboard
4. Review server logs
5. Test MongoDB connection separately

## Quick Fix Checklist

- [ ] `.env` file exists in `backend/` directory
- [ ] `.env` file contains `MONGODB_URI=...`
- [ ] No spaces around `=` in `.env`
- [ ] MongoDB is running (local) or connection string is correct (Atlas)
- [ ] IP address is whitelisted (MongoDB Atlas)
- [ ] Server restarted after changing `.env`
- [ ] Dependencies installed (`npm install`)

