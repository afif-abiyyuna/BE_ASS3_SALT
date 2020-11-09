const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');


const memberSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [3, 'Username is too short'],
        maxlength: [12, 'username is yoo long']
    },
    email: {
        type: String,
        required: true,
        default: "example@gmail.com",
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password is too short']
    },
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
        min: [18, 'AGE NOT ENOUGH']
    },
    role:{
      type: String,
      default: 'user',
    },
    addresses : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }],
    carts : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }],

});

memberSchema.pre('save', function (next) {
    Member.findOne({ email: this.email })
    .then((result) => {
        if (result) {
            next({ name: 'EMAIL ALREADY EXIST' });
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            this.password = bcrypt.hashSync(this.password, salt);
            next();
        }
    })
    .catch((err) => next({ name: 'MONGOOSE DATABASE ERROR' }));
});

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;