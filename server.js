import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import itemRoutes from './routes/itemRoutes.js';

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI environment variable is not set!');
  console.error('Please create a .env file in the backend directory.');
  console.error('You can copy env.example to .env and update it with your MongoDB connection string.');
  process.exit(1);
}

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Node.js MongoDB CRUD API',
    version: '1.0.0',
    endpoints: {
      items: '/api/items',
      'get all items': 'GET /api/items',
      'get item by id': 'GET /api/items/:id',
      'create item': 'POST /api/items',
      'update item': 'PUT /api/items/:id',
      'delete item': 'DELETE /api/items/:id',
    },
  });
});

// API Routes
app.use('/api/items', itemRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API URL: http://localhost:${PORT}/api/items`);
});

