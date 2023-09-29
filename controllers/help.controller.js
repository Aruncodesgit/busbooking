const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID; 
var db = mongoose.connection; 
const Help = mongoose.model('Help');

module.exports.helpDetails = async (req, res, next) => {   
    Help.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });
}