const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID; 
var db = mongoose.connection;
//const Bus = mongoose.model('Bus');

module.exports.busDetails = async (req, res, next) => {  
    db.collection("bus").find().toArray(function(e, d) {
        if(!e) {res.send(d);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); } 
    });  
}


module.exports.busDetailsById = async (req, res, next) => {   
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)
    var id = req.params.id;  
    var o_id = new ObjectId(id);
    const findResult = await db.collection("bus").find({_id:o_id}).toArray();
    res.send(findResult);  
}
 
module.exports.busSearch = async (req, res, next) => { 
    const { from, to , category, type } = req.query; 
   
    db.collection("bus").find({ from, to , category, type}).toArray(function(e, d) {
        if(!e) {res.send(d);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); } 
    }); 
} 


module.exports.placesDetails = async (req, res, next) => {  
    db.collection("places").find().toArray(function(e, d) {
        if(!e) {res.send(d);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); } 
    });  
}