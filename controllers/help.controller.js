const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID; 
var db = mongoose.connection; 
const Helps = mongoose.model('Helps');

module.exports.helpDetails = async (req, res, next) => {   
    Helps.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });
}

module.exports.helpDetailsById = async (req, res, next) => {    

    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)

    Helps.findById(req.params.id, (err, docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });
}