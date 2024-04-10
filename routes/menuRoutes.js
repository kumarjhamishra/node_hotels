const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItem");

//POST method to get add a new Item
router.post('/', async(req, res) => {
    try {
        const data = req.body;

        //createa new person with named user
        const newMenu = new MenuItem(data);

        //save the new user to the database
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})



//GET method to get all the menu
router.get('/', async(req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    } 
    catch (error) {
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
} )

//taste can be sweet, sour, spicy
router.get('/:taste', async(req, res) => {
    try {
        const taste = req.params.taste; //extract the taste from the URL parameter
        if(taste == 'sweet' || taste == 'sour' || taste == 'spicy'){
            
            //finding the workType in databse
            const response = await MenuItem.find({taste: taste});
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

//comment added for testing purpose
module.exports = router;

