const mongoose = require ('mongoose');


const orderDetailSchema = new mongoose.Schema({
    total:{type:Number, required:true},
    orderId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    cartId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }],
    memberId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }]

});

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);
module.exports = OrderDetail;