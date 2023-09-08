const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID; 
var db = mongoose.connection; 

const Coupons = mongoose.model('Coupons');

module.exports.couponsDetails = async (req, res, next) => {  
     
    Coupons.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });

}
    