const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema ({
    productname:{type:String,required:true},
    thumbnail:{data:Buffer,contentType:String},
    image:{data:Buffer,contentType:String},
    description:{type:String,required:true},
    price:{type:Number, required:true},
    total:{type:Number, required:true},
    shortdescription:{type:String, required:true},
    categories:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    }]

});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;