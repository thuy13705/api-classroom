// const node_validator = require('node-input-validator'),
//       errorHelper    = require('../helpers/errorHelper'),
//       { Validator }  = node_validator

// let REGISTER = async function( req, res, next ){

//     let validate = new Validator(req.body, {
//         nameUser: "required|string|minLength:1|maxLength:10000",
//         email   : "required|email|minLength:3|maxLength:500",
//         password: "required|string|minLength:6|maxLength:1000",
//     },{
//         'title.required'     : ":attribute is required"
//     });
     
//     let matched = await validate.check()
//     if (!matched) {
//         req.errors = validate.errors
//         return errorHelper.apiResponseErrorResource( req, res )
//     }
//     next()
// }

// let LOGIN = async function( req, res, next ){

//     let validate = new Validator(req.body, {
//         email   : "required|email|minLength:3|maxLength:500",
//         password: "required|string|minLength:6|maxLength:1000",
//     },{
//         'title.required'     : ":attribute is required"
//     });
     
//     let matched = await validate.check()
//     if (!matched) {
//         req.errors = validate.errors
//         return errorHelper.apiResponseErrorResource( req, res )
//     }
//     next()
// }

// module.exports = {
//     REGISTER,
//     LOGIN,
// }