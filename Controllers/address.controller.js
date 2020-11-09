const Address = require ('../Models/Address.model');

class addressController{
    static createAddress (req,res,next){
        const {village,subdistrict,district,province,country,telephone,zip} = req.body;
        Address.create({village,subdistrict,district,province,country,telephone,zip})
        .then(result=>{
            res.status(200).json({message:'New Address has been created', data: result});
        })
        .catch(next);
    }

    static listAddress (req,res,next){
        Address.find()
        .then(result=>{
            res.status(200).json({message:'List of Address Member', data:result});
        })
        .catch(next);
    }

    static getAddressById (req,res,next){
        const {addressId} = req.params;
        Address.findById(addressId)
        .then(result=>{
            res.status(200).json({message:'Succes get Address by Id Member', data:result});
        })
        .catch(next);
    }

    static updateAddress (req,res,next){
        const {village,subdistrict,district,province,country,telephone,zip} = req.body;
        const {addressId} = req.params;
        const updatedData = {village,subdistrict,district,province,country,telephone,zip}

        for (let key in updatedData){
            if(!updatedData[key]){
              delete updatedData[key]
            }
        }

        Address.findByIdAndUpdate(addressId, updatedData, {new:true})
        .then(result=>{
            res.status(200).json({message:'succes update addres data member', data:result});
        })
        .catch(next);
    }

    static deleteAddress (req,res,next){
        const {addressId} = req.params;
        Address.findByIdAndDelete(addressId)
        .then(result=>{
            res.status(200).json({message:'succes to delete address data member', data:result});
        })
        .catch(next);
    }

    static patchmemberId (req,res,next){
        const {memberId} = req.body;
        const {addressId} = req.params;

        Address.findByIdAndUpdate(addressId, {$push:{memberId:memberId}}, {new:true})
        .then(result=>{
            res.status(200).json({message:'success to patch member id', data:result});
        })
        .catch(next);
    }
}

module.exports = addressController;