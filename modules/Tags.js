const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    tag : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});


module.exports = mongoose.model('BookMark' , TagSchema);