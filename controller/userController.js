const User = require('../model/User')

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.postEditUser = async (req, res) => {

  try {
    const response = {};
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      response.message = "Email";
      const result = await User.findOneAndUpdate({ _id: req.user._id },
        { nameUser: req.body.name }, { upsert: true }).exec();
      response.newUser = result;
    }
    else {
      response.message = "Success";
      const result = await User.findOneAndUpdate({ _id: req.user._id },
        { nameUser: req.body.name, email: req.body.email }, { upsert: true }).exec();
        response.newUser = result;
    }
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }

}