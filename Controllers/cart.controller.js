const Cart = require ('../Models/Cart.model');
const Product = require ('../Models/Product.model');

class cartController{
    static addCart (req,res,next){
        const {productId, quantity} = req.body;
        const { memberId } = req.params
        let qty
        if (quantity) {
            qty = quantity
        } else {
            qty = 1
        }
        Product.findById(productId)
        .then( product => {
            Cart.findOne({memberId, productId})
            .populate('productId')
            .then(result=>{

                if (result === null) {
                    const cart = new Cart({
                        memberId: memberId,
                        productId: productId,
                    });
                    return cart.save()

                } else {

                    const newtotalquantity = parseInt(result.quantityproduct) + parseInt(qty);
                    console.log(result);
                    const newtotalprice = result.productId.price * newtotalquantity
                    console.log(newtotalprice);
                    return Cart.findByIdAndUpdate({ _id: result._id }, { $set: { 'totalprice': newtotalprice, quantityproduct: newtotalquantity } })

                }

            })
            .then(cart=>{
                res.status(200).json({message:'success to add new cart', cart});
            })
            .catch(next);
        })

        // const {chooseProduct,totalProduct} = req.body;
        // Cart.create({chooseProduct,totalProduct})
        // .then(result=>{
        //     res.status(200).json({message:'succes adding product to cart', data:result});
        // })
        // .catch(next);
    }

    static listCart (req,res,next){
        Cart.find()
        .populate('memberId')
        .then(result=>{
            res.status(200).json({message:'success to list product in cart', data:result});
        })
        .catch(next);
    }

    static updateCart (req,res,next){
        const {chooseProduct,totalProduct} = req.body;
        const {cartId} = req.params;
        const updatedData = {chooseProduct,totalProduct} 

        for (let key in updatedData){
            if(!updatedData[key]){
              delete updatedData[key]
            }
        }

        Cart.findByIdAndUpdate(cartId, updatedData, {new:true})
        .then(result=>{
            res.status(200).json({message:'success to update cart product', data:result});
        })
        .catch(next);
    }

    static deleteCart (req,res,next){
        const {cartId} = req.params;
        Cart.findByIdAndDelete(cartId)
        .then(result=>{
            res.status(200).json({message:'success to delete product from cart', data:result});
        })
        .catch(next);
    }

    static patchmemberId (req,res,next){
        const {memberId} = req.body;
        const {cartId} = req.params;
        
        Cart.findByIdAndUpdate(cartId, {$push:{memberId:memberId}}, {new:true})
        .then(result=>{
            res.status(200).json({message:'success to patch memberId to cart', data:result});
        })
        .catch(next);
    }
}

module.exports = cartController;