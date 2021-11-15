
const Course = require('../model/Course')
const User = require('../model/User');

exports.getListCourse = async function (req, res, next) {
  try {
    const result = await Course.find({}).exec();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.postCourse = async function (req, res, next) {
  try {
    var course = new Course();
    course.nameCourse = req.body.name;
    course.category = req.body.category;
    course.room = req.body.room;
    course.teachers.push(req.user._id);
    const result = await course.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.getCourseDetail = async function (req, res, next) {
  var id = req.params.id;
  try {
    const result = await Course.findOne({_id:id}).populate('teachers').populate('students').exec();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}

exports.putCourseUpdate = async function (req, res, next) {

  try {
    const result = await Course.findOneAndUpdate({ _id: req.params.id }, {
      name: req.body.name,
    }, { upsert: true }).exec();

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }

}

exports.deleteCourse = async function (req, res, next) {
  try {
    console.log(req.params.id);
    const result = await Course.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.getLinkInvite = async function (req, res, next) {
  try {
    console.log(req.params.id);
    const result = await Course.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

