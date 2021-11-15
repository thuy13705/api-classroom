var express=require('express');
var userRouter=express.Router();
const userController=require('../controller/userController');
const verify = require("../auth/checkToken")

userRouter.get('/profile',verify,userController.getUserProfile);
userRouter.post('/profile',verify,userController.postEditUser);
module.exports=userRouter;