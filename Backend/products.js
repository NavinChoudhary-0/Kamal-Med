const router = require('express').Router();
const { Product } = require('../models');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a product
router.post('/add', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;