# Node.js MongoDB CRUD API

A RESTful API built with Node.js, Express.js, and MongoDB for performing basic CRUD operations.

## Features

- ✅ MongoDB connection with Mongoose
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ RESTful API endpoints
- ✅ Error handling
- ✅ Input validation
- ✅ Pagination support
- ✅ Search and filter functionality
- ✅ CORS enabled
- ✅ Environment variables configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone or navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file and update the MongoDB connection string:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/crud-db
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   - **Local MongoDB:** Make sure MongoDB is running on your local machine
   - **MongoDB Atlas:** Use your Atlas connection string in `.env`

5. **Run the application:**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Base URL
```
http://localhost:5000/api/items
```

### Endpoints

#### 1. Get All Items
- **URL:** `GET /api/items`
- **Query Parameters:**
  - `page` - Page number (default: 1)
  - `limit` - Items per page (default: 10)
  - `category` - Filter by category
  - `search` - Search by name
- **Example:**
  ```bash
  GET http://localhost:5000/api/items
  GET http://localhost:5000/api/items?page=1&limit=5
  GET http://localhost:5000/api/items?category=electronics
  GET http://localhost:5000/api/items?search=laptop
  ```

#### 2. Get Item by ID
- **URL:** `GET /api/items/:id`
- **Example:**
  ```bash
  GET http://localhost:5000/api/items/507f1f77bcf86cd799439011
  ```

#### 3. Create Item
- **URL:** `POST /api/items`
- **Body:**
  ```json
  {
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "quantity": 10,
    "category": "electronics",
    "isActive": true
  }
  ```
- **Required Fields:** `name`, `price`

#### 4. Update Item
- **URL:** `PUT /api/items/:id`
- **Body:**
  ```json
  {
    "name": "Updated Laptop",
    "price": 899.99,
    "quantity": 15
  }
  ```

#### 5. Delete Item
- **URL:** `DELETE /api/items/:id`
- **Example:**
  ```bash
  DELETE http://localhost:5000/api/items/507f1f77bcf86cd799439011
  ```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error message"
}
```

## Example Requests

### Create an Item
```bash
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15",
    "description": "Latest iPhone model",
    "price": 999,
    "quantity": 50,
    "category": "electronics"
  }'
```

### Get All Items
```bash
curl http://localhost:5000/api/items
```

### Get Item by ID
```bash
curl http://localhost:5000/api/items/ITEM_ID
```

### Update Item
```bash
curl -X PUT http://localhost:5000/api/items/ITEM_ID \
  -H "Content-Type: application/json" \
  -d '{
    "price": 899,
    "quantity": 45
  }'
```

### Delete Item
```bash
curl -X DELETE http://localhost:5000/api/items/ITEM_ID
```

## MongoDB Connection

### Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service
3. Update `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/crud-db
   ```

### MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Update `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
   ```

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── models/
│   └── Item.js              # Item model/schema
├── routes/
│   └── itemRoutes.js        # Item CRUD routes
├── .env.example             # Environment variables example
├── .gitignore               # Git ignore file
├── package.json             # Dependencies and scripts
├── server.js                # Main server file
└── README.md                # Documentation
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

## Error Handling

The API includes comprehensive error handling:
- Validation errors (400)
- Not found errors (404)
- Server errors (500)
- Database connection errors

## Testing

You can test the API using:
- **Postman** - Import the API endpoints
- **cURL** - Use command-line requests
- **Browser** - For GET requests
- **Thunder Client** (VS Code extension)

## License

ISC

