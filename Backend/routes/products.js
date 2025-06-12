const router = require('express').Router();
const { Product } = require('../models');
const { Op } = require('sequelize');
const {upperLimitOnNumberOfProducts} = require('../config/Constants');
// Get all products
router.get('/after/:nextId', async (req, res) => {
  try {
    const {nextId} = req.params;
    const products = await Product.findAll({ limit: upperLimitOnNumberOfProducts, where:{id: {[Op.gt]: nextId}}, order: [['id', 'ASC']] });
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get products by type
router.get('/type/:type', async (req, res)=>{
  try{
    // Flattening the objects
    const {type} = req.params;
    const products = await Product.findAll({ limit: upperLimitOnNumberOfProducts, where:{category : type}});
    res.json(products);
  }catch(err){
    res.status(400).json({ error: err.message });
  }
})

// Get products by Search query
router.get('/searchonquery', async (req, res)=>{
  try{
    const { query, category, nextId } = req.query;
    const whereClause = {}, firstQueryName = {}, secondQueryName = {}, secondQueryDescription = {};
    if(query){
      firstQueryName.name = {[Op.iRegexp]: "^" + query + ".*"};
      secondQueryName.name = {[Op.iRegexp]: query + ".*"};
      secondQueryDescription.description = {[Op.iRegexp]: query + ".*"};
    }
    if (category && category.toLowerCase() !== 'all') {
      whereClause.category = category;
    }
    const products = await Product.findAll({ limit: upperLimitOnNumberOfProducts, where: { ...firstQueryName, ...whereClause, id: {[Op.gt]: nextId} }, order: [['id', 'ASC']]});
    if(products.length < 20){
      products.push(...removeDuplicates(await Product.findAll({ limit: upperLimitOnNumberOfProducts - products.length, where: { ...secondQueryName, ...whereClause, id: {[Op.gt]: nextId}}, order: [['id', 'ASC']]}), products));
    }
    if(products.length < 20){
      products.push(...removeDuplicates(await Product.findAll({ limit: upperLimitOnNumberOfProducts - products.length, where: { ...secondQueryDescription, ...whereClause, id: {[Op.gt]: nextId}}, order: [['id', 'ASC']]}), products));
    }
    res.json(products);
  }catch(err){
    res.status(400).json({ error: err.message });
  }
})

// Get a product by Category
router.get('/category', async (req, res) => {
  try {
    const { category, nextId } = req.query;
    const products = await Product.findAll({ limit: upperLimitOnNumberOfProducts, where: { category, id: { [Op.gt]: nextId } }, order: [['id', 'ASC']] });
    res.json(products);
  } catch (error) { 
    res.status(400).json({ error: err.message });
  }
})

// TODO Add a product
router.post('/add', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// TODO Delete a product
router.post('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    await Product.destroy({ where: { id } });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Helper function to remove duplicates
const removeDuplicates = (newProducts, existingProducts) => {
  const existingIds = new Set(existingProducts.map(p => p.id));
  return newProducts.filter(product => !existingIds.has(product.id));
};

module.exports = router;