const passport = require('passport');
//LocalStrategy is id and password
const LocalStrategy = require('passport-local').Strategy;
const Person = require("./models/Person");


passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    //authentication logci here
    try {
        //console.log('Received credentials: ', USERNAME, password);
        //finding USERNAME in Person collection
        const user = await Person.findOne({username : USERNAME});
        if(!user) return done(null, false, {message: 'Incorrect username'});

        //matching the password
        const isPasswordMatch = await user.comparePassword(password); //this is our made function in personSchema
        if(isPasswordMatch){
            return done(null, user);
        }
        else return done(null, false, {message: 'Incorrect password'});
        
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport;