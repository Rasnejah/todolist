
const mongoose = require('mongoose');
const url = 'mongodb://root:example@localhost:27017/api?authSource=admin'

mongoose.connect(url, {    
    useNewUrlParser: true, 
    useUnifiedTopology: true 
 }, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
 })

