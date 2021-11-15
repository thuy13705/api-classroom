const mongoose=require('mongoose');
const Schema=mongoose.Schema;


var courseSchema=new Schema({
    nameCourse:{type:String, default:""},
    students: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    teachers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    category:{type:String, default:""},
    room:{type:String, default:""}
});
module.exports = mongoose.model('Course', courseSchema);
