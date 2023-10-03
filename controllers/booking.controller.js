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

    var traveller = travellerDetails[0]?.passengerDetails?.traveller
    var pickup = travellerDetails[0]?.passengerDetails?.pickupPoint

    booking.save((err, doc) => {
        if (!err) {
            res.send(doc);
            var mailOptions = {
                from: 'arun70840@gmail.com',
                to: user.email,
                subject: 'My Travels',
                html: `  <table width="600px" style="border-collapse: collapse; font-family: 'Bai Jamjuree', sans-serif;  margin: auto;overflow: hidden; border: 1px solid #f7f7f7;"> 
                <tr>
                    <td align="center" colspan="2" style=" font-size: 25px; background-color: #0d61b7;height: 100px; color:#fff;text-align: center;">
                          Confirmed !
                    </td>
                </tr> 
                <tr>
                    <td align="left" colspan="2" style="padding:15px 30px;"> 
                         
                    </td>
                </tr>
                <tr>
                    <td align="left" colspan="2" style="font-size: 20px; padding:10px 30px;">
                        Your booking is confirmed on ` + bookedDate + `
                    </td>
                </tr>
                <tr>
                    <td align="left" colspan="2" style="font-size:14px; padding:0px 30px;"> 
                        Booking ID # ` + bookingID + `
                    </td>
                </tr>
                <tr>
                    <td align="center" colspan="2" style="font-size:14px; padding:25px 30px;">
                        <table style="width: 100%;   border-collapse: collapse;">
                            <tr style="font-weight: bold;">
                                <td>From</td>
                                <td>To</td>
                                <td>Date</td>
                                <td>Departure Time</td>
                            </tr>
                            <tr>
                                <td>` + busFrom + `</td>
                                <td>` + busTo + `</td>
                                <td>` + bookedDate + `</td>
                                <td>` + busTimeFrom + `</td>
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
                                <td>` + busTimeTo + `</td>
                                <td>` + busTravelTime + `</td>
                                <td>` + totalSeat + `</td> 
                                <td>` + seatType + `</td>

                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" colspan="2" style="font-size:14px; padding:5px 30px;">
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
                <tr>
                    <td align="center" colspan="2" style="font-size:14px; padding:5px 30px;">
                        <table style="width: 100%;   border-collapse: collapse;">
                            <tr style="font-weight: bold;">
                                <td>Sl.No.</td>
                                <td>Name</td>
                                <td>Age</td>
                                <td>Gender</td>
                                <td>Seat No.</td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>Xyz</td>
                                <td>25</td>
                                <td>Male</td>
                                <td>5c</td>
                            </tr> 
                            <tr>
                                <td>01</td>
                                <td>Xyz</td>
                                <td>25</td>
                                <td>Male</td>
                                <td>5c</td>
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
                        Payment details
                    </td>
                </tr>
                <tr>
                    <td align="center" colspan="2" style="font-size:14px; padding:5px 30px;">
                        <table style="width: 100%;    border-collapse: collapse;">
                            <tr >
                                <td style="font-weight: bold;">key</td>
                                <td style="float: right;">value</td> 
                            </tr>
                            <tr>
                                <td  style="font-weight: bold;">key</td>
                                <td  style="float: right;">value</td> 
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="left" colspan="2" style="padding:15px 30px;"> 
                         
                    </td>
                </tr>
                <tr>
                    <td align="center" colspan="2" style=" font-size: 14px; background-color: #0d61b7;height: 40px; color:#fff;text-align: center;">
                        copyrights @2023 , All rights reserved
                    </td>
                </tr> 
            </table> `,
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error)
                    console.log(error);
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
