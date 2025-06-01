const fs = require('fs');
const {Product} = require('../../models/index');

const data = [];
const imagesDir = __dirname + "/../images"
const productsFields = Object.keys(Product.rawAttributes)
console.log(productsFields);

fs
  .readdirSync(imagesDir)
  .forEach(file => {
    const dataPerFile = {}
    productsFields.forEach(field => {
        if(field === "id" || field === "updatedAt" || field === "createdAt"){
            return;
        }
        if(field === "name"){
            dataPerFile[field] = file.replace(".jpg", "");
        }else if(field === "image"){
            dataPerFile[field] = imagesDir.replace("\\Script/..", "") + file;
        }else{
            dataPerFile[field] = "";
        }
    })
    data.push(dataPerFile);

  })
//  console.log(JSON.stringify(data));

  fs.writeFileSync(__dirname + "/Data.js", JSON.stringify(data),  (err) => {
    if (err) throw err;
    console.log('JavaScript object written to file as JS code!');
  });