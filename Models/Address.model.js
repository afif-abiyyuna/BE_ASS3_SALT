    const mongoose = require ('mongoose');

const addressSchema = new mongoose.Schema({
    village: {type: String,required: true},
    subdistrict: {type: String,required: true},
    district: {type: String,required: true},
    province: {type: String,required: true},
    country: {type: String,required: true,},
    telephone: {type: Number,minlength: 11,required: true},
    zip: {type: Number,minlength: 5,required: true},
    memberId :[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Member'
    }]
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;