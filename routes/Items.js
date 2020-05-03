const express = require('express');
const items = express.Router();
const cors = require('cors');

const Item = require('../models/Item');
items.use(cors());

items.post('/add' , (req,res) => {

     let cartItem = new Item(req.body)
     
    Item.findOne({
       _id:req.body._id

    })
    .then(item => {
        if(!item){
                cartItem.save()
                    .then(item =>{
                        res.json({status:item._id + ': success'})
                    })
                    .catch(err =>{
                        res.send('error: ' + err)
                    })
        
        }else{
            res.json({error: 'Item already exist'})
        }
    })
    .catch(err => {
        res.send('error: ' + err )
    })
})
    // Item.create(req.body, function(err, createdItem){
    //     if (err) return next(err);
    //     console.log(createdItem)
    //     res.json(createdItem)
    // })
      
        


items.get('/all' , (req,res) => {
    Item.find((err, items) => {
        if (err)
            console.log(err);
        else
            res.json(items);
    });
});
module.exports = items;