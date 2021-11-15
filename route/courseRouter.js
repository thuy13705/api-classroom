var express=require('express');
var courseRouter=express.Router();
const courseController=require('../controller/courseController');
const verify = require("../auth/checkToken")

courseRouter.get('/course',verify,courseController.getListCourse);
courseRouter.post('/course',verify,courseController.postCourse);
courseRouter.get('/course/:id',verify,courseController.getCourseDetail);
courseRouter.put('/course/:id',verify,courseController.putCourseUpdate);
courseRouter.delete('/course/:id',verify,courseController.deleteCourse);
///Tạo lời mời.
courseRouter.get('/course/in/:id',verify,courseController.getLinkInvite);

module.exports=courseRouter;