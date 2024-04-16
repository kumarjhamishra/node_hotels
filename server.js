const express = require("express");
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');


const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

//Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next(); // Move to the next phase
}

app.use(logRequest);


app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});
app.get('/', localAuthMiddleware ,function(req, res){
    res.send("Welcome to the MAHARAJAS... How can I help you sir?");
})


//import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

//use the routes
app.use('/person', personRoutes);
app.use('/menu',  menuRoutes);


app.listen(PORT, ()=> {
    console.log("server is working on port 3000");
});