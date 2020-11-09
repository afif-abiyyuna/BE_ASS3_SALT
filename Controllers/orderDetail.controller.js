const OrderDetail = require ('../Models/OrderDetail.model');
const Cart = require ('../Models/Cart.model');
const Product = require ('../Models/Product.model');

class orderDetailController{

    static orderDetail (req,res,next){
        const {cartId} = req.params;
        Cart.findById(cartId).then(cart => {
            Product.findById(cart.productId).then(product => {
                if (product.total < cart.quantityproduct) {
                    return next ({ name: 'PRODUCT INVALID' })
                } else {
                    const totalStock = product.total - cart.quantityproduct

                    return Product.findByIdAndUpdate({_id: cart.productId}, {$set:{ total: totalStock }})
                }
            })
            .then(product => {
                res.status(200).json({ quantity: cart.quantityproduct, totalprice: cart.totalprice });
            })
        })
        .catch(next);
    }

    static createOrderDetail (req,res,next){
        const {total} = req.body;
        OrderDetail.create({total})
        .then(result=>{
            console.log(result);
            res.status(201).json({message:'success to create Order Detail', data:result});
        })
        .catch(next);
    }

    static listOrderDetail (req,res,next){
        OrderDetail.find()
        .then(result=>{
            res.status(200).json({message:'succes to get list of order detail', data:result});
        })
        .catch(next);
    }

    static updateOrderDetail (req,res,next){
        const {total} = req.body;
        const {orderDetailId} = req.params;
        const updatedData = {total}

        for (let key in updatedData){
            if(!updatedData[key]){
              delete updatedData[key]
            }
        }

        OrderDetail.findByIdAndUpdate(orderDetailId, updatedData, {new:true})
        .then(result=>{
            res.status(200).json({message:'success to update order detail', data:result});
        })
        .catch(next);
    }

    static deleteOrderDetail (req,res,next){
        const {orderDetailId} = req.params;
        OrderDetail.findByIdAndUpdate(orderDetailId)
        .then(result=>{
            res.status(200).json({message:'success to delete order detail', data:result});
        })
        .catch(next);
    }

    static patchorderId (req,res,next){
        const {orderId} = req.body;
        const {orderDetailId} = req.params;

        OrderDetail.findByIdAndUpdate(orderDetailId, {$push:{orderId:orderId}}, {new:true})
        .then(result=>{
            res.status(200).json({message:'success to patch orderId to order detail', data:result});
        })
        .catch(next);
    }

    static patchproductId (req,res,next){
        const {productId} = req.body;
        const {orderDetailId} = req.params;

        OrderDetail.findByIdAndUpdate(orderDetailId, {$push:{productId:productId}}, {new:true})
        .then(result=>{
            res.status(200).json({message:'success to patch productId to order detail', data:result});
        })
        .catch(next);
    }
}

module.exports = orderDetailController;