const {Product} = require('../../models/index');
const ProductData = require('./Data.js');
// console.log(ProductData);

ProductData.forEach(async product => {
    try{
        await Product.create(product);
        console.log("Product added successfully");
        
    }catch(e){
        console.log("Not able to add product inside Database due to this reason"+ e);
    }
});


