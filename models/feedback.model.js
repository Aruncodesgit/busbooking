const mongoose = require('mongoose');  
var feedbackSchema = new mongoose.Schema({   

    feedback:String,
    date:Date,
    user_id :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required :true
    },
});
 
mongoose.model('Feedback', feedbackSchema); 


  