const mongoose = require('mongoose');  
var busSchema = new mongoose.Schema({   

    from: String,
    to: String,
     
});
 
mongoose.model('Bus', busSchema); 


  