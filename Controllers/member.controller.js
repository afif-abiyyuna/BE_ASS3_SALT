const Member = require ('../Models/Member.model');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');


class memberController{
    static memberRegister (req,res,next){
        const { username, email, password, firstname, lastname, age} = req.body;
        Member.create({username, email, password, firstname, lastname, age})
        .then((result)=>{
            res.status(201).json({message:'Welcome New Member', data: result });
        })
        .catch(next)
    }

    static memberLogin(req, res, next) {
        const { email, password } = req.body;
        Member.findOne({ email })
        .then((member) => {
            if (member && bcrypt.compareSync(password, member.password)) {
              const access_token = jwt.sign({ _id: member._id }, 'Ecommerce');
              res.status(200).json({ success: true, access_token, data: member });
            } else throw { name: "LOGIN_FAILED" };
        })
        .catch(next);
    }

    static memberList (req,res,next){
        Member.find()
        .populate('addresses')
        .then(result=>{
            res.status(200).json({message:'List of Member', data:result});
        })
        .catch(next);
    }

    static memberById (req,res,next){
        const {memberId} = req.params;
        Member.findById(memberId)
        .populate('addresses')
        .then(result=>{
            res.status(200).json({message:'success get profile member', data:result});
        })
        .catch(next);
    }

    static memberUpdate (req,res,next){
        const {username, email, password, firstname, lastname, age} = req.body;
        const {memberId} = req.params;
        const updatedData = {username, email, password, firstname, lastname, age}

        for (let key in updatedData){
            if(!updatedData[key]){
              delete updatedData[key]
            }
          }

        Member.findByIdAndUpdate(memberId, updatedData, {new:true})
        .then(result=>{
            res.status(200).json({message:'success updated member data', data:result});
        })
        .catch(next);
    }

    static memberDelete (req,res,next){
        const {memberId} = req.params;
        Member.findByIdAndDelete(memberId)
        .then(result=>{
            res.status(200).json({message:'success deleted member data', data:result});
        })
        .catch(next);
    }

    static memberPatchAddress (req,res,next){
        const {addressId} = req.body;
        Member.findByIdAndUpdate(
            req.params.memberId,
            {$push:{addresses:addressId}},
            {new:true}
        )
        .then(result=>{
            res.status(200).json({message:'success patch addres data member', data:result});
        })
        .catch(next);
    }

    static patchcartId (req,res,next){
        const {cartId} = req.body;
        const {memberId} = req.params;

        Member.findByIdAndUpdate(memberId, {$push:{carts:cartId}}, {new:true})
        .then(result=>{
            res.status(200).json({message:'success to patch cartId to member', data:result});
        })
        .catch(next);
    }

}   



module.exports = memberController;