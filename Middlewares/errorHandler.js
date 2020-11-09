module.exports = (err, req, res, next)=>{
    console.log(err);
    let code;
    let name = err.name;
    let message;

    switch(name){
        case 'LOGIN FAILED':
            code = 401;
            message = 'Email and Password Combination Not Found!';
            break;
        case 'EMAIL ALREADY EXIST':
            code = 400;
            message = 'Email Already Exist!'
            break;
        case 'MONGOOSE DATABASE ERROR':
            code = 500;
            message = 'Something Error With Database';
            break;
        case 'INVALID TOKEN':
            code = 401;
            message = 'Access Token Invalid';
            break;
        case 'MISSING TOKEN':
            code = 401;
            message = 'Access Token Missing';
            break;
        case 'PRODUCT INVALID':
            code = 401;
            message = 'Product is not ready';
            break;
        default:
            code = 500;
            message = 'Internal Server Error';
    }

    res.status(code).json({succes:false, message});
}