const { model } = require('../Models/Product.model');
const Product = require('../Models/Product.model');
const productDao = {
    getProduct : (query)=>{
        return new Promise(
            (resolve, reject) =>{
                Product.findOne(query)
                .populate('Category')
                .exec(function(err, product){
                    if(err||!product){
                        return reject({status:400, success:false, err})
                    } else {
                        return resolve ({product})
                    }
                })
            }
        )
    }
}

module.exports = productDao;