const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const Booking = mongoose.model('Booking');
const generateUniqueId = require('generate-unique-id');

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
    booking.save((err, doc) => {
        if (!err) {
            res.send(doc); 
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
        if (!err) { res.send(docs); }
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
