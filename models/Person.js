const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

//Defining the person schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
       type: String ,
       enum: ['chef','waiter','manager'],
       required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }

});

personSchema.pre('save', async function(next){
    const person = this;

    //hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();

    try {
        //salt generation
        const salt = await bcrypt.genSalt(10);

        //hash password generation
        const hashedPasssword = await bcrypt.hash(person.password, salt);
        person.password = hashedPasssword;

        next();
    } catch (error) {
        return next(error);
    }
});

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        //use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
        
    } catch (error) {
        throw error;
    }
}

//ye compare password stored password se salt extract karega then hamare diye hue password me nuse add karke then mathch karega ki match karta hai ya nhi

//create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;