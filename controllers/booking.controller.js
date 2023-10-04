const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const Booking = mongoose.model('Booking');
const generateUniqueId = require('generate-unique-id');
var nodemailer = require('nodemailer');  
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(express.static('views'));

let transporter1 = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
        user: 'arun70840@gmail.com',
        pass: 'nzitmddyckrepiux',
    },
    connectionTimeout: 5 * 60 * 1000,
    tls: {
        rejectUnauthorized: false,
    },
})

module.exports.booking = (req, res, next) => {
    const busID = generateUniqueId({
        length: 4,
        useLetters: false
    });

    var booking = new Booking();
    booking.busId = req.body.busId;
    booking.bookedDate = req.body.bookedDate;
    booking.bookingID = 'My-Travel' + busID;
    booking.busFare = req.body.busFare;
    booking.promoID = req.body.promoID;
    booking.promoAmount = req.body.promoAmount;
    booking.finalAmoutWithPromo = req.body.finalAmoutWithPromo;
    booking.busFrom = req.body.busFrom;
    booking.busTo = req.body.busTo;
    booking.busTimeFrom = req.body.busTimeFrom;
    booking.busTimeTo = req.body.busTimeTo;
    booking.seatType = req.body.seatType;
    booking.busTravelTime = req.body.busTravelTime;
    booking.bookedSeats = req.body.bookedSeats;
    booking.travellerDetails = req.body.travellerDetails;
    booking.status = req.body.status;
    booking.totalSeat = req.body.totalSeat;
    booking.user_id = req._id;

    var travellers = booking.travellerDetails[0]?.passengerDetails?.traveller
 
    // for(let i = 0; i < travellers.length; i++) {
    //     console.log(travellers[i].name , travellers[i].age );
    // } 

    var pickup = booking.travellerDetails[0]?.passengerDetails?.pickupPoint  
    var pricePerHead = booking.busFare[0]?.pricePerHead
    var subtotal = booking.busFare[1]?.subtotal
    var gst = booking.busFare[2]?.gst
    var totalFare = booking.busFare[3]?.totalFare
    console.log(totalFare)
    var dicountedAmt = booking.busFare[5]?.dicountedAmt  
   
    if(dicountedAmt === null) {
        dicountedAmt = 0;
    }
    var afterDisc = booking.busFare[6]?.afterDisc 
    if(afterDisc === null) {
        afterDisc = totalFare;
    }

    // for (${i=0}; ${i < travellers.length}; ${i++}) {
    //     <tr>
    //         <td>${travellers[i].name}</td>
    //         <td>${travellers[i].age}</td>
    //         <td>${travellers[i].gender}</td>
    //         <td>${travellers[i].seatNo}</td>
    //     </tr>
    // }
    const travelData =   ejs.renderFile(__dirname + '/views/email.ejs', { 
        data: travellers,
    });
    booking.save((err, doc) => { 

        if (!err) {
            res.send(doc); 
            
            var mailOptions1 = {
                from: 'arun70840@gmail.com',
                to: 'arun70840@gmail.com',
                subject: 'My Travels',
                html:   travelData ,
            };
            transporter1.sendMail(mailOptions1, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(info);
                }

            })
        }
        else {
            return next(err);
        }

    });
}

module.exports.bookingDetails = async (req, res, next) => {
    const booking = await Booking.find({ user_id: req._id });
    res.json(booking)

}


module.exports.bookingDetailsAll = async (req, res, next) => {
    Booking.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });
}

module.exports.bookingDetailsById = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record found with given id: ${req.params.id}`)

    Booking.findById(req.params.id, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });
}

module.exports.busSearch = async (req, res, next) => {
    const { busFrom, busTo } = req.query;
    Booking.find({ busFrom, busTo }, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
}
