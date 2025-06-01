const {Product} = require('../../models/index');
const ProductData = require('./Data.js');

ProductData.forEach(async product => {
    try{
        await Product.create(product);
    }catch(e){
        console.log("Not able to add product inside Database due to this reason"+ e);
    }
});


