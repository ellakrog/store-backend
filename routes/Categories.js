const express = require('express');
const categories = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Category= require('../models/Category');
categories.use(cors());

process.env.SECRET_KEY = 'secret'


//add new Object Category
categories.post('/add' , (req,res) => {
    
    const categoryData = {
        name:req.body.name,
       
    }
    Category.findOne({
        name: req.body.name

    })
    .then( category => {
        if(!category){
                Category.create(categoryData)
                    .then(category =>{
                        res.json({status: category.name + ': success'})
                    })
                    .catch(err =>{
                        res.send('error: ' + err)
                    })
        
        }else{
            res.json({error: 'category already exist'})
        }
    })
    .catch(err => {
        res.send('error: ' + err )
    })
})

//get all Caterories
categories.get('/all' , (req,res) => {
    Category.find((err, categories) => {
        if (err)
            console.log(err);
        else
            res.json(categories);
    });
});

categories.get('/cat/:_id' , (req,res) => {
    Category.findById({
        _id: req.params._id
    })
    .then(cat =>{
        if(cat){
            res.json(cat)
        }else{
            res.send("Category does not exist")
        }
    })
    .catch(err =>{
        res.send('error: ' + err)
    })
})


module.exports = categories;