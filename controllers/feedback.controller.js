const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const Feedback = mongoose.model('Feedback');

module.exports.feedback = (req, res, next) => {
    var feedback = new Feedback();
    feedback.feedback = req.body.feedback; 
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

// module.exports.feedbackgDetails = async (req, res, next) => {
//     const booking = await Feedback.find({ user_id: req._id });
//     res.json(booking)

// } 