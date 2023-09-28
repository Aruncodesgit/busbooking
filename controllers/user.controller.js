const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const passport = require('passport');
const _ = require('lodash');
const User = mongoose.model('User');
var db = mongoose.connection;
var nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const e = require('express');
const generateUniqueId = require('generate-unique-id');
const jwt = require('jsonwebtoken');

const otpCode = generateUniqueId({
    length: 4,
    useLetters: false
});  

let transporter = nodemailer.createTransport({  
    host: "smtp.gmail.com",
    port: 465, 
    secure: true,
    auth: {
        user: 'arun70840@gmail.com',
        pass: 'nzitmddyckrepiux',
    }, 
    tls: { 
        rejectUnauthorized: false,
      },
})
 
module.exports.register = async (req, res, next) => {

    var user = new User();
    user.fullName = req.body.fullName;  
    user.email = req.body.email;
    user.password = req.body.password;   
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    var shortName = user.fullName.substring(0, 2);
    user.shortName = shortName;
    user.otp = req.body.otp;
    user.otpNumber = otpCode
    user.save((err, doc) => {
            if (!err) {
                res.send(doc); 
                var mailOptions = {
                    from: 'arun70840@gmail.com',
                    to: user.email,
                    subject: 'My Travels',
                    html: ` <table width="600px" style="border-collapse: collapse; font-family: 'Bai Jamjuree', sans-serif;  margin: auto;overflow: hidden; border: 1px solid #f7f7f7;"> 
                    <tr>
                        <td align="center" colspan="2" style=" font-size: 25px; background-color: #0d61b7;height: 100px; color:#fff;text-align: center;">
                            Verify Email
                        </td>
                    </tr>
                    <tr>
                        <td align="center" colspan="2"
                            style=" padding:60px 50px 10px 50px;color:#000; font-weight: 300; font-size:18px" valign="middle">
                            Here is your One Time Password</td>
                    </tr>
                    <tr>
                        <td align="center" colspan="2"
                            style=" padding: 0px 50px;color:#666464; font-weight: 300; font-size:14px" valign="middle">
                            to validate your email address</td>
                    </tr>
                    <tr>
                        <td align="center" style=" letter-spacing: 10px; padding: 40px 50px 30px 50px!important;color:#000; font-weight: 300; font-size: 64px;
                         ">
                            ` + otpCode + ` 
                        </td>
            
                    </tr> 
                </table> `,
                }; 
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error)
                        console.log(error);  
                })
                transporter.verify().then(console.log).catch(console.error);
            } 
            else {
                if (err.code == 11000)
                    res.status(422).send(['Duplicate email found']);

                else
                    return next(err);
            } 
        }); 

}

module.exports.updateRegister = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(` No record found with given id : ${req.params.id}`);

    var user = { 
        phone:req.body.phone 
    }; 
    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in employee update:' + JSON.stringfy(err, undefined, 2)); }
    });
}

// module.exports.otpUpdate = (req, res, next) => {
//     if (!ObjectId.isValid(req.params.id))
//         return res.status(400).send(` No record found with given id : ${req.params.id}`);

//     var user = { 
//         otp:req.body.otp 
//     }; 
 

//     User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
//         if (!err) { res.send(doc); }
//         else { console.log('Error in employee update:' + JSON.stringfy(err, undefined, 2)); }
//     });
// }

module.exports.userDetails = async (req, res, next) => {  
    User.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });
}

// get by Id 
module.exports.registerGetById = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record found with given id: ${req.params.id}`)

    User.findById(req.params.id, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });
}

  
// login authenticate
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {

        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) { 
            if (user.otp == 'yes') {
                res.status(200).json({ _id: user._id, fullName: user.fullName, role: user.role, "token": user.generateJwt() });
                
            }
            else { 
                return res.status(404).json({ status: false, message: 'OTP has not been validated' })

            }
        } 
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}




// user profile
module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({
                    status: true, user: _.pick(user, [
                        '_id', 'fullName', 'email', 'phone', 'shortName'

                    ])
                });
        }
    );
}
 