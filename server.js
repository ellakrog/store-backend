var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended:false
    })
)

const mongoURI = 'mongodb://localhost:27017/users'

mongoose.connect(mongoURI, {useNewUrlParser:true})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))

var User = require('./routes/Users')
var Product = require('./routes/Products')
var Category = require('./routes/Categories')
var Item = require('./routes/Items')

app.use('/users', User);
app.use('/products', Product);
app.use('/categories' , Category);
app.use('/items', Item)
app.listen(port, () =>{
    console.log('Server is running on port:' +port)
})