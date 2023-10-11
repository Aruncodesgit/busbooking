const mongoose = require('mongoose');  
var feedbackSchema = new mongoose.Schema({   

    otpField:String,
    uiuxField:String,
    friendlyField:String,
    smoothlyField:String,
    otherField:String, 
    date:Date,
    rating:Number,
    user_id :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required :true
    },
});
 
mongoose.model('Feedback', feedbackSchema); 


  