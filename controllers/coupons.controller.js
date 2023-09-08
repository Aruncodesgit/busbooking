const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID; 
var db = mongoose.connection; 

module.exports.couponsDetails = async (req, res, next) => {  
    db.collection("coupons").find().toArray(function(e, d) {
        if(!e) {res.send(d);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); } 
    });  
}
    