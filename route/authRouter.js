var express=require('express');
const router=express.Router();
const authController=require('../controller/authController');
const generalMiddleware=require('../middleware/generalmiddle');
const authMiddleware=require('../middleware/jwt');
const userMiddleware=require('../middleware/usermiddle');

let initAPIs = app => {
    router.post('/register',authController.postRegister)
    router.post('/login',  authController.postLogin)
    return app.use( "/", router )
}
module.exports = initAPIs