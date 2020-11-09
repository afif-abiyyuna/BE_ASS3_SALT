const Order = require ('../Models/Order.model');
const Cart = require ('../Models/Cart.model');
const Product = require ('../Models/Product.model');

class orderController{
    static createOrder (req,res,next){
        const {cartId,productId} = req.body;
        Cart.findById(cartId)
        // .populate('productId')
        .then(cart=>{
            Product.findById(productId)
            .then(product=>{
                if (product.total < cart.quantityproduct){
                    throw {name: 'NOT ENOUGH'}
                } else {
                    const pre = product.total - cart.quantityproduct;
                    return Product.findOneAndUpdate({_id:productId}, {$set:{total:pre}})
                }
            })
            Cart.findById(cartId)
            .populate('cartId')
            .then(cart=>{

                // console.log(cart);
                Order.findOne({_id:cart._id})
                .populate('productId')
                .then(order=>{
                    // console.log(order);
                    if(order == null){
                        const checkout = new Order({
                            _id:cart._id,
                            memberId:req.params.id,
                            productId:productId,
                            productname:cart.productname,
                            thumbnail:cart.thumbnail,
                            image:cart.image,
                            price:cart.price,
                            shortdescription:cart.shortdescription,
                            quantityproduct:cart.quantityproduct,
                            totalprice:cart.totalprice,
                        });
                        return checkout.save()
                        .then((result)=>{
                            console.log(checkout);
                            console.log(result);
                            res.status(200).json({Message:'Success to checkout'});
                        })
                        .catch(next)
                    } else {
                        const totalproduct= checkout.quantityproduct + cart.quantityproduct
                        const totalprice = checkout.totalprice + cart.totalprice;
                        return Order.findOneAndUpdate({productId:cart.productId},{$set:{stock:totalproduct, totalprice:totalprice}});
                    }
                })
                .catch(next);
             
             
            })
            .then(()=>{
                Cart.findById(cartId)
                .then(cart=>{return cart.remove()})
                .then(cart=>{
                    res.status(200).json({ message:'success to delete cart', deleted:cart.productname })
                })
            }) 
            .catch(next);
        })
        .catch(next);
    }

    static listOrder (req,res,next){
        Order.find()
        .then(result=>{
            res.status(200).json({message:'succes to get list of order product', data:result});
        })
        .catch(next);
    }

    static modifyOrder (req,res,next){
        const {ordername,totalorder} = req.body;
        const {orderId} = req.params;
        const updatedData = {ordername,totalorder} 

        for (let key in updatedData){
            if(!updatedData[key]){
              delete updatedData[key]
            }
        }

        Order.findByIdAndUpdate(orderId, updatedData, {new:true})
        .then(result=>{
            res.status(200).json({message:'success to modify order product', data:result});
        })
        .catch(next);
    }

    static deleteOrder (req,res,next){
        const {orderId} = req.params;
        Order.findByIdAndDelete(orderId)
        then(result=>{
            res.status(200).json({message:'success to delete order product', data:result});
        })
        .catch(next);
    }

    static patchUser (req,res,next){
        const {memberId} = req.body;
        const {orderId} = req.params;

        Order.findByIdAndUpdate(orderId,{$push:{memberId:memberId}},{new:true})
        .then(result=>{
            res.status(200).json({message:'success to patch userId', data:result});
        })
        .catch(next);
    }


}

module.exports = orderController;