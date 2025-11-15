import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

// @route   GET /api/items
// @desc    Get all items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    
    // Build query
    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Get items with pagination
    const items = await Item.find(query)
      .limit(limit * 1)
      .skip(skip)
      .sort({ createdAt: -1 }); // Sort by newest first
    
    // Get total count for pagination
    const total = await Item.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: items,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching items',
      error: error.message,
    });
  }
});

// @route   GET /api/items/:id
// @desc    Get single item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid item ID',
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error fetching item',
      error: error.message,
    });
  }
});

// @route   POST /api/items
// @desc    Create a new item
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, description, price, quantity, category, isActive } = req.body;
    
    // Validate required fields
    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name and price',
      });
    }
    
    const item = new Item({
      name,
      description,
      price,
      quantity: quantity !== undefined ? quantity : 0,
      category: category || 'general',
      isActive: isActive !== undefined ? isActive : true,
    });
    
    const savedItem = await item.save();
    
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: savedItem,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages,
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating item',
      error: error.message,
    });
  }
});

// @route   PUT /api/items/:id
// @desc    Update an item
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, quantity, category, isActive } = req.body;
    
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }
    
    // Update fields
    if (name !== undefined) item.name = name;
    if (description !== undefined) item.description = description;
    if (price !== undefined) item.price = price;
    if (quantity !== undefined) item.quantity = quantity;
    if (category !== undefined) item.category = category;
    if (isActive !== undefined) item.isActive = isActive;
    
    const updatedItem = await item.save();
    
    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: updatedItem,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid item ID',
      });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages,
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error updating item',
      error: error.message,
    });
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Item deleted successfully',
      data: item,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid item ID',
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error deleting item',
      error: error.message,
    });
  }
});

export default router;

