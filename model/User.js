
'use strict'

const bcrypt           = require('bcrypt'),
      SALT_WORK_FACTOR = 12;      
const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const userSchema=new Schema({
    nameUser:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, required:true},
});

userSchema.methods.comparePassword = function(_password) {
    return bcrypt.compareSync(_password, this.password);
}

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    /// nếu là thêm mới hoặc update password thì băm trước
    try {
        const salt    = await bcrypt.genSalt(SALT_WORK_FACTOR)
        this.password = await bcrypt.hash(this.password, salt)
        return next()
    } catch (err) {
        return next(err)
    }
})
userSchema.methods.toResources = function() {   
    return {
        _id      : this._id,
        nameUser : this.nameUser,
        email    : this.email,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    }
}
module.exports = mongoose.model("User", userSchema)