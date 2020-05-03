var category = require('./Category');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    
    name :{
        type: String
    },
    desc :{
        type: String
   
    },
    price :{
        type: String
        
    },
    imageUrl :{
        type: String
    },
    category: {
        _id : { type: Schema.Types.ObjectId, ref: 'categories'},
        name: {type: Schema.Types.String, ref : 'categories'}  
      }   
})
module.exports = Product = mongoose.model( 'products', ProductSchema);