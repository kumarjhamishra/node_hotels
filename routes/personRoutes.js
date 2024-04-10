const express = require("express");
const router = express.Router();

const Person = require('../models/Person');

router.post('/', async(req, res) => {
    try {
        const data = req.body;

        //createa new person with named user
        const newPerson = new Person(data);

        //save the new user to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

//workType can be manager, waiter, chef
router.get('/:workType', async(req, res) => {
    try {
        const workType = req.params.workType; //extract the workType from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            
            //finding the workType in databse
            const response = await Person.find({work: workType});
            console.log('response fetched');
            
            //sending it as response
            res.status(200).json({response});
        }
        else{
            res.status(404).json({error: 'Invalid work type'});
        }
    } 
    catch (error) {
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

//GET method to get all the information of a person
router.get('/', async(req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } 
    catch (error) {
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
} )

//update 
router.put('/:id', async(req, res) => {
    try {
        const personId = req.params.id; //extract the id from the URL parameter
        const updatedPersonData = req.body; // updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true, // return the updated document
            runValidators: true, // run mongoose validation
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log("data updated");
        res.status(500).json(response);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal server error'});
    }
})


//delete 
router.delete('/:id', async(req, res) => {
    try {
        const personId = req.params.id; //extract the id from the URL parameter

        const response = await Person.findByIdAndDelete(personId)

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log("data deleted");
        res.status(500).json({message: "person deleted successfully"});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal server error'});
    }
})

module.exports = router;