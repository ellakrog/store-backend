const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
users.use(cors());

process.env.SECRET_KEY = 'secret'

users.post('/register' , (req,res) => {
    const today = new Date()
    const userData = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        created:today
    }
    User.findOne({
        email: req.body.email

    })
    .then(user => {
        if(!user){
            bcrypt.hash(req.body.password, 6 , (err, hash) =>{
                userData.password = hash
                User.create(userData)
                    .then(user =>{
                        res.json({status:user.email + 'success'})
                    })
                    .catch(err =>{
                        res.send('error: ' + err)
                    })
            })
        }else{
            res.json({error: 'User already exist'})
        }
    })
    .catch(err => {
        res.send('error: ' + err )
    })
})

users.post('/login', (req,res) => {
    User.findOne({
        email:req.body.email
    })
    .then(user =>{
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)){
                const payload ={
                    _id: user._id,
                    name: user.name,
                    email:user.email
                }
                //let token = jwt.sign(payload, process.env.SECRET_KEY, {
                 //   expiresIn:1440
              //  })
               res.send(user)
            }else{
                res.json({error: " User does not exist"})
            }
        }else{
            res.json({error: " User does not exist"})
        }
    })
    .catch(err =>{
        res.send('error: ' + err)
    })
})

users.get('/profile/:_id' , (req,res) => {
    User.findById({
        _id: req.params._id
    })
    .then(user =>{
        if(user){
            res.json(user)
        }else{
            res.send("User does not exist")
        }
    })
    .catch(err =>{
        res.send('error: ' + err)
    })
})

module.exports = users;