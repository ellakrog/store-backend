var products = require('./Product');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
 
  
    product:{
        _id: { type: Schema.Types.ObjectId, ref: 'products'},
        name: { type: Schema.Types.String, ref : 'products'},
        price:{ type: Schema.Types.Number, ref : 'products'},
        imageUrl:{type: Schema.Types.String, ref: 'products'} 
    },
    
     
    qty: {
        type: Number
    }
})
module.exports = Item = mongoose.model( 'items', ItemSchema);
