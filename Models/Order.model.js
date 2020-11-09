const mongoose = require ('mongoose');

const orderSchema = new mongoose.Schema({
    memberId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }],
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    cartId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }
    

});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;