const express = require('express');
//const ejs = require('ejs');
const nodemailer = require('nodemailer');
//const app = express();

const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const Booking = mongoose.model('Booking');
const generateUniqueId = require('generate-unique-id');

const jsdom = require('jsdom')
const dom = new jsdom.JSDOM("")
const jquery = require('jquery')(dom.window)

//app.set('view engine', 'ejs');
//app.use(express.static('views'));

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
    booking.user_email = req.body.user_email;
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
    var dicountedAmt = booking.busFare[5]?.dicountedAmt
    jquery('table tr:nth-child(15)').append(`<td>` + dicountedAmt + `</td>`);
    if (dicountedAmt === null) {
        dicountedAmt = 0;
    }
    var afterDisc = booking.busFare[6]?.afterDisc
    if (afterDisc === null) {
        afterDisc = totalFare;
    }

    if (booking.promoAmount > 1) {
        var promoAmt = booking.promoAmount
        var finalAmtWithProm = booking.finalAmoutWithPromo
    }
    if (booking.promoAmount < 1) {
        var promoAmt = 0;
        var finalAmtWithProm = totalFare;
    }

    var saved = promoAmt + dicountedAmt



    // for (${i=0}; ${i < travellers.length}; ${i++}) {
    //     <tr>
    //         <td>${travellers[i].name}</td>
    //         <td>${travellers[i].age}</td>
    //         <td>${travellers[i].gender}</td>
    //         <td>${travellers[i].seatNo}</td>
    //     </tr>
    // }
    // const travelData =   ejs.renderFile(__dirname +'/email.ejs', { 
    //     data: travellers,
    // });
    booking.save((err, doc) => {

        if (!err) {
            res.send(doc);

            var mailOptions1 = {
                from: 'arun70840@gmail.com',
                to: booking.user_email,
                subject: 'My Travels',
                html: `  <table  width="100%" style="border-collapse: collapse; font-family: 'Bai Jamjuree', sans-serif;  margin: auto;overflow: hidden; border: 1px solid #f7f7f7;"> 
                <tr>
                    <td align="center" colspan="2" style="width:100%;font-size:18px; background-color: #0d61b7;height: 65px; color:#fff;text-align: center;">
                         Booking Confirmed !
                    </td>
                </tr>  
                <tr>
                    <td align="left" colspan="2" style="padding:5px 30px;"> 
                                         
                    </td>
               </tr>
               <tr>
                    <td   colspan="2" style="padding:10px 30px;"> 
                      <img src="cid:confirm" style='width:60px;display:block;margin:auto;'/>                  
                    </td>
               </tr>
               <tr>
                    <td align="left" colspan="2" style="font-size:10px; padding:10px 30px 0px 30px;font-weight: bold;"> 
                        Reservation Details
                    </td>
                </tr>
                <tr>
                    <td align="left" colspan="2" style="padding:0px 30px;"> 
                        <hr style="border-top: 1px solid #f7f7f7;"> 
                    </td>
                </tr>
                <tr>
                    <td align="left" colspan="2" style="font-size:12px; padding:5px 30px;">
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
                        <table style="width:100%;border-collapse: collapse;">
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
                    <td align="center" colspan="2" style="font-size:7px; padding:0px 30px;">
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
                    <td align="left" colspan="2" style="font-size:10px; padding:20px 30px 0px 30px;font-weight: bold;"> 
                        Traveller details
                    </td>
                </tr>
                <tr>
                    <td align="left" colspan="2" style="padding:0px 30px;"> 
                        <hr style="border-top: 1px solid #f7f7f7;"> 
                    </td>
                </tr> 
                <tr>
                    <td align="center" colspan="2" style="font-size:7px; padding:5px 30px;">
                        <table style="width: 100%;   border-collapse: collapse;">
                            <tr>
                                <th style='text-align:left;'>Sl No.</th>
                                <th style='text-align:left;'>Name</th>
                                <th style='text-align:left;'>Age</th>
                                <th style='text-align:left;'>Gender</th>
                                <th style='text-align:left;'>Seat No.</th>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td style='text-align:left;'>` + travellers[0].name + `</td>
                                <td style='text-align:left;'>` + travellers[0].age + `</td>
                                <td style='text-align:left;'>` + travellers[0].gender + `</td>
                                <td style='text-align:left;'>` + travellers[0].seatNo + `</td>
                            </tr> 
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="left" colspan="2" style="font-size:10px; padding:20px 30px 0px 30px;font-weight: bold;"> 
                        Fare details
                    </td>
                </tr>
                <tr>
                    <td align="left" colspan="2" style="padding:0px 30px;"> 
                        <hr style="border-top: 1px solid #f7f7f7;"> 
                    </td>
                </tr>
                <tr>
                    <td align="center" colspan="2" style="font-size:7px; padding:5px 30px;">
                        <table style="width: 100%;    border-collapse: collapse;">
                            <tr >
                                <td style="font-weight: bold; padding-bottom:7px;">Price Per Seat</td>
                                <td style="float: right; padding-bottom:7px;">Rs : ` + pricePerHead + `</td> 
                            </tr>
                            <tr>
                                <td  style="font-weight: bold; padding-bottom:7px;">Sub Total</td>
                                <td  style="float: right; padding-bottom:7px;">Rs : ` + subtotal + `</td> 
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-bottom:7px;border-top:1px dashed #e3e3e3;"></td>
                            </tr>
                            <tr>
                                <td  style="font-weight: bold; padding-bottom:7px;">GST 5%</td>
                                <td  style="float: right; padding-bottom:7px;">Rs : ` + gst + `</td> 
                            </tr>
                            <tr>
                                <td  style="font-weight: bold; padding-bottom:7px;">Basic Fare</td>
                                <td  style="float: right; padding-bottom:7px;">Rs : ` + totalFare + `</td> 
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-bottom:7px;border-top:1px dashed #e3e3e3;"></td>
                            </tr>
                            <tr>
                                <td  style="font-weight: bold; padding-bottom:7px;">Booking Discount</td>
                                <td  style="float: right; padding-bottom:7px;">Rs : ` + dicountedAmt + `</td> 
                            </tr>
                            <tr>
                                <td  style="font-weight: bold; padding-bottom:7px;">Promo Code Discount</td>
                                <td  style="float: right; padding-bottom:7px;">Rs : ` + promoAmt + `</td> 
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-bottom:7px;border-top:1px dashed #e3e3e3;"></td>
                            </tr>
                            <tr>
                                <td  style="font-weight: bold; padding-bottom:7px;">Saved Amount</td>
                                <td  style="float: right; padding-bottom:7px;">Rs : ` + saved + `</td> 
                            </tr>
                            <tr>
                                <td colspan="2" style="padding-bottom:7px;border-top:1px dashed #e3e3e3;"></td>
                            </tr>
                            <tr>
                                <td  style="font-weight: bold; padding-bottom:7px;">Paid Amount</td>
                                <td  style="float: right; padding-bottom:7px;">Rs : ` + afterDisc + `</td>
                                <td  style="float: right; padding-bottom:7px;" class="appendData"> </td> 
                            </tr> 
                        </table>  
                    </td>
                </tr>
            </table> ` ,
                attachments: [{
                    filename: 'confirmed.png',
                    path: __dirname + '/confirmed.png',
                    cid: 'confirm'
                }],
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
