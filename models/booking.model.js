const mongoose = require('mongoose');  
var bookingSchema = new mongoose.Schema({   

    busId :  String,
    bookedSeats :   [String],
    bookingID: String,
    travellerDetails : [  ],
    seatType :  String,
    busFare :  [  ],
    busFrom :  String,
    promoID :  String,
    promoAmount :  Number,
    finalAmoutWithPromo :  Number,
    busTo :  String,
    busTimeFrom :  String,
    busTimeTo :  String,
    busTravelTime :  String,
    bookedDate  :String,
    user_email:  String,
    status  :String,
    bookedDate  :String,
    totalSeat:  Number,
    user_id :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required :true
    },
});
 
mongoose.model('Booking', bookingSchema); 


  