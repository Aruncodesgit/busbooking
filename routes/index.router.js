const express = require('express');
const router = express.Router(); 
const jwtHelper = require('../config/jwtHelper'); 
require('../config/passportConfig');
var cors = require('cors')

 
const ctrlUser = require('../controllers/user.controller'); 
const ctrlbus = require('../controllers/bus.controller'); 
const ctrlbooking = require('../controllers/booking.controller');  
const ctrlCoupons =   require('../controllers/coupons.controller'); 
const ctrlfeedback =   require('../controllers/feedback.controller'); 

router.post('/register', ctrlUser.register);  
router.get('/userDetails', ctrlUser.userDetails); 
router.get('/registerDetails/:id', ctrlUser.registerGetById);

router.post('/authenticate', ctrlUser.authenticate); 
router.get('/userProfile', cors(), jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.put('/register/:id', ctrlUser.updateRegister);


 
router.get('/busDetails' , cors(), ctrlbus.busDetails); 
router.get('/busDetailsById/:id', ctrlbus.busDetailsById);
router.get('/searchBus' , ctrlbus.busSearch);
router.get('/placesDetails' , ctrlbus.placesDetails); 

router.get('/couponsDetails' , ctrlCoupons.couponsDetails); 

 
router.get('/search' , ctrlbooking.busSearch); 
router.post('/booking', jwtHelper.verifyJwtToken,  ctrlbooking.booking);  
router.get('/bookingDetailsAll' , ctrlbooking.bookingDetailsAll); 
router.get('/bookingDetails',jwtHelper.verifyJwtToken,  ctrlbooking.bookingDetails); 
router.get('/bookingDetailsById/:id',jwtHelper.verifyJwtToken,  ctrlbooking.bookingDetailsById);


router.post('/feedback' , jwtHelper.verifyJwtToken, ctrlfeedback.feedback); 
module.exports = router;



