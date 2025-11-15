# Quick Start Guide

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

## Step 2: Set Up Environment Variables

Create a `.env` file in the backend directory:

```bash
# Copy the example file
cp env.example .env
```

Or create `.env` manually with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crud-db
NODE_ENV=development
```

## Step 3: Start MongoDB

### Option A: Local MongoDB
Make sure MongoDB is installed and running:
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

### Option B: MongoDB Atlas (Cloud)
**See [MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md) for complete step-by-step instructions.**

**Quick steps:**
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free M0 cluster
3. Create a database user
4. Whitelist your IP address
5. Get your connection string
6. Update `.env` with your connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```

## Step 4: Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## Step 5: Test the API

### Using cURL

**Create an item:**
```bash
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "quantity": 10,
    "category": "electronics"
  }'
```

**Get all items:**
```bash
curl http://localhost:5000/api/items
```

**Get item by ID:**
```bash
curl http://localhost:5000/api/items/ITEM_ID
```

**Update an item:**
```bash
curl -X PUT http://localhost:5000/api/items/ITEM_ID \
  -H "Content-Type: application/json" \
  -d '{
    "price": 899.99,
    "quantity": 15
  }'
```

**Delete an item:**
```bash
curl -X DELETE http://localhost:5000/api/items/ITEM_ID
```

### Using Browser

Open your browser and navigate to:
- `http://localhost:5000` - API information
- `http://localhost:5000/api/items` - Get all items

### Using Postman

1. Import the API endpoints
2. Create a new POST request to `http://localhost:5000/api/items`
3. Set Body to JSON and add:
```json
{
  "name": "Laptop",
  "price": 999.99,
  "quantity": 10
}
```

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items (with pagination, search, filter) |
| GET | `/api/items/:id` | Get item by ID |
| POST | `/api/items` | Create a new item |
| PUT | `/api/items/:id` | Update an item |
| DELETE | `/api/items/:id` | Delete an item |

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running (for local)
- Check your connection string in `.env`
- Verify network access (for MongoDB Atlas)

### Port Already in Use
- Change `PORT` in `.env` file
- Or stop the process using port 5000

### Module Not Found
- Run `npm install` again
- Check that all dependencies are installed

## Next Steps

- Customize the Item model in `models/Item.js`
- Add more routes in `routes/itemRoutes.js`
- Add authentication/authorization
- Add more validation
- Add unit tests

