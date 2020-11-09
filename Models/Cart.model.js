const mongoose = require ('mongoose');

const cartSchema = new mongoose.Schema ({
    quantityproduct:{type:Number, default:1},
    memberId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Member'
    },
    productId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'

    },
    totalprice:{type:Number, default:0}
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;