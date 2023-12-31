const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const Feedback = mongoose.model('Feedback');

module.exports.feedback = (req, res, next) => {
    var feedback = new Feedback();
    feedback.otpField = req.body.otpField; 
    feedback.uiuxField = req.body.uiuxField; 
    feedback.friendlyField = req.body.friendlyField; 
    feedback.smoothlyField = req.body.smoothlyField; 
    feedback.otherField = req.body.otherField; 
    feedback.rating = req.body.rating; 
    feedback.user_id = req._id;
    feedback.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            return next(err);
        }

    });
}

module.exports.feedbackDetails = async (req, res, next) => {
    const feedback = await Feedback.find({ user_id: req._id });
    res.json(feedback)

} 