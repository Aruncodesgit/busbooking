const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const Booking = mongoose.model('Booking');
const generateUniqueId = require('generate-unique-id');
var nodemailer = require('nodemailer');

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
    var pickup = booking.travellerDetails[0]?.passengerDetails?.pickupPoint  
    booking.save((err, doc) => {
        if (!err) {
            res.send(doc);
            var mailOptions1 = {
                from: 'arun70840@gmail.com',
                to: 'arun70840@gmail.com',
                subject: 'My Travels',
                html: `  <table width="100%" style="border-collapse: collapse; font-family: 'Bai Jamjuree', sans-serif;  margin: auto;overflow: hidden; border: 1px solid #f7f7f7;"> 
                <tr>
                    <td align="center" colspan="2" style="width:100%;font-size:18px; background-color: #0d61b7;height: 65px; color:#fff;text-align: center;">
                          Confirmed !
                    </td>
                </tr>  
                <tr>
                    <td align="left" colspan="2" style="padding:15px 30px;"> 
                                         
                    </td>
               </tr>
                <tr>
                    <td align="left" colspan="2" style="font-size:12px; padding:10px 30px;">
                        Your booking is confirmed on ` + booking.bookedDate + `
                     </td>
                </tr>
                <tr>
                    <td align="left" colspan="2" style="font-size:10px; padding:0px 30px;"> 
                      Booking ID #` + booking.bookingID + `
                     </td>
                </tr>
                <tr>
                    <td align="center" colspan="2" style="font-size:7px; padding:25px 30px;">
                        <table style="width: 100%;border-collapse: collapse;">
                            <tr style="font-weight: bold;">
                                <td>From</td>
                                <td>To</td>
                                <td>Date</td>
                                <td>Departure Time</td>
                            </tr>
                            <tr>
                                <td>` + booking.busFrom + `</td>
                                <td>` + booking.busTo + `</td>
                                <td>` + booking.bookedDate + `</td>
                                <td>` + booking.busTimeFrom + `</td>
                            </tr> 
                            <tr>
                                <td align="left"  style="padding:10px 30px;"> 
                                     
                                </td>
                            </tr>
                            <tr style="font-weight: bold;">
                                <td>Arrival Time</td>
                                <td>Journey Hours</td>
                                <td>No. of Seats</td> 
                                <td>Seat Type</td> 
                            </tr>
                            <tr>
                                <td>` + booking.busTimeTo + `</td>
                                <td>` + booking.busTravelTime + `</td>
                                <td>` + booking.totalSeat + `</td> 
                                <td>` + booking.seatType + `</td> 
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" colspan="2" style="font-size:7px; padding:5px 30px;">
                        <table style="width: 100%;   border-collapse: collapse;">
                            <tr style="font-weight: bold;">
                                <td>Pick Up Point</td> 
                            </tr>
                            <tr>
                                <td>` + pickup + `</td> 
                            </tr> 
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="left" colspan="2" style="padding:15px 30px;"> 
                        <hr style="border-top: 1px solid #f7f7f7;"> 
                    </td>
                </tr>
                <tr>
                    <td align="left" colspan="2" style="font-size:14px; padding:0px 30px;font-weight: bold;"> 
                        Traveller details
                    </td>
                </tr>
            </table> `,
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
