require('./config/config');
require('./models/db');

  
const passport = require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const path = require('path')
 

const rtsIndex = require('./routes/index.router'); 
 
var app = express();

// middleware

// it used when we use ejs
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());  
app.use('/api', rtsIndex);
app.set('view engine', 'ejs')
app.use('/uploads', express.static('uploads')); 
app.use(express.static('views'));


// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

// app.use(express.static(path.join(__dirname, 'dist')))

// app.get('*', function(req, res){
//     res.sendFile(path.join(__dirname, 'dist/index.html'))
// })
 

 
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started at port : ${process.env.PORT}`));

// start server
//app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));