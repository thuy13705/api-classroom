require('dotenv').config();

const jwt=require('jsonwebtoken');
const secret=process.env.JWT_SRCRET||'jsonwebtoken-secret';

let hashTokenAccess=async user=>{
    return jwt.sign(user,secret,{expiresIn:'259200s'});
}

module.exports={hashTokenAccess};