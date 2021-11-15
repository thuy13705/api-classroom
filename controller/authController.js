const User=require('../model/User');
require("dotenv").config();
const authHelper=require('../helpers/authHelper');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {registerValidation, loginValidation} = require("../auth/validation");
const { response } = require('express');
const con = require('../database/db');

exports.postRegister=async function(req,res,next){
//   let code=500.
//       response={};
//       try {
//         const { nameUser, email, password } = req.body
//         /// check email tồn tại
//         const isExist = await User.findOne({ email })
//         if( isExist ){
//             code = 409 /// 409 Conflict
//             throw new Error("email đã tồn tại!!")
//         }
//         /// lưu vào db mongo
//         const user = await new User({ nameUser, email, password }).save()
//         /// khúc này nếu bạn kỹ tính hãy tạo 1 phương thức chung để format dữ liệu 
//         /// còn mình làm nhanh thì trả ra dữ liệu luôn
//         response.code             = 200
//         response.data             = user.toResources();
//         response.message          = "tạo user thành công"
//         response.internal_message = `Bạn đã tạo thành công mới 1 user với email là ${email}`

//         return res.status(response.code).json(response)

//     } catch (error) {
        
//         let err                       = { error: 'error', message: error.message }
//             response.code             = code || 500
//             response.message          = error.message
//             response.internal_message = error.message
//             response.errors           = [ err ]

//         return res.status(response.code).json(response)
//     }

	// Validate User
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Check if User already in database
	const emailExist = await User.findOne({ email: req.body.email });
	if(emailExist) return res.status(400).send('Email already exists');

	// Hash Passwords
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// Validated And Create User
	const user = new User({ 
		nameUser: req.body.nameUser,
		email: req.body.email,
		password: hashedPassword
	});

	try{
		const savedUser = await user.save();
		res.json(savedUser);
	} catch (err) {
		res.json({ message: err });
	}
  };

  exports.postLogin = async ( req, res ) => {

    // let code     = 500,
    //     response = {}
    // /// giả sử khúc này  tới đây bạn đã sử dụng middleware ở ngoài để validate dữ liệu đầu vào
    // try {
    //     const { email, password } = req.body
    //     /// check email tồn tại
    //     const user = await User.findOne({ email }) /// vì email duy nhất nên findOne
    //     if( !user ){
    //         code = 401 /// 401 Unauthorized
    //         throw new Error("Email hoặc password không đúng!!")
    //     }
    //     /// nếu có email cần check xem password có match đúng với db không? 
    //     const isMatch = await user.comparePassword(password)
    //     if( !isMatch ){
    //         /// nếu password không chính xác thì trả ra lỗi
    //         code = 401 /// 401 Unauthorized
    //         throw new Error("Email hoặc password không đúng!!")
    //     }
    //     /// nếu email và password chính xác thì tạo 1 mã jwt quăng ra cho ngừoi dùng
    //     const strJWT = await authHelper.hashTokenAccess(user.toResources())

        
    //     /// khúc này nếu bạn kỹ tính hãy tạo 1 phương thức chung để format dữ liệu 
    //     /// còn mình làm nhanh thì trả ra dữ liệu luôn
    //     response.code             = 200
    //     response.data             = strJWT
    //     response.message          = "User login thành công"
    //     response.internal_message = `Bạn đã login thành công mới 1 user với email là ${email}`

    //     return res.status(response.code).header("auth-token", strJWT).send(strJWT);
    // } catch (error) {
        
    //     let err                       = { error: 'error', message: error.message }
    //         response.code             = code || 500
    //         response.message          = error.message
    //         response.internal_message = error.message
    //         response.errors           = [ err ]
            
    //     return res.status(response.code).json(response)
    // }
    const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);
  console.log(req.body);
	// Check if Email Exists
	const user = await User.findOne({ email: req.body.email });
	if(!user) return res.status(400).send('Email Does Not Exist');

	const validPass = await bcrypt.compare(req.body.password, user.password)
	if(!validPass) return res.status(400).send('Invalid Password');

	// Create & Assign Token 
	const token = jwt.sign({ _id: user._id, nameUser:user.nameUser,email:user.email}, process.env.JWT_SECRET);
  const response={};
  response.token = token;
	res.header('auth-token', token).json(response);
} 
