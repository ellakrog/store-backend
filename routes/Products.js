const express = require('express');
const products = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Product = require('../models/Product');
const Category = require('../models/Category')
products.use(cors());

process.env.SECRET_KEY = 'secret'

products.post('/add' , (req,res) => {
    let productItem = new Product(req.body);

    Product.findOne({
        name: req.body.name

    })
    .then(product => {
        if(!product){
                productItem.save()
                    .then(product =>{
                        res.json({status:product.name + ': success'})
                    })
                    .catch(err =>{
                        res.send('error: ' + err)
                    })
        
        }else{
            res.json({error: 'Product already exist'})
        }
    })
    .catch(err => {
        res.send('error: ' + err )
    })
})


products.get('/all' , (req,res) => {
    Product.find((err, products) => {
        if (err)
            console.log(err);
        else
            res.json(products);
    });
});

//get all products by category name
products.get('/:category_name' , (req,res) =>{ 
  
    let name= req.params.category_name
    console.log(req.params.category_name)
    Product.find({ 'category.name': name})
    .exec((err, data) => { 
        if(err){ res.status(500).send(err) 
        }else{ res.json(data);
             console.log(data) 
            } 
        }) 
    
    })
//     .then(product =>{
//         if(product){
//             res.json(product)
//         }else{
//             res.send("Category does not exist")
//         }
//     })
//     .catch(err =>{
//         res.send('error: ' + err)
//     })
// })
products.get('/details/:_id' , (req,res) => {
   Product.findById({
        _id: req.params._id
    })
    .then(product =>{
        if(product){
            res.json(product)
        }else{
            res.send("product does not exist")
        }
    })
    .catch(err =>{
        res.send('error: ' + err)
    })
})

module.exports = products;