const mongoose = require('mongoose');

const BookMarkSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    websiteURL : {
        type : String,
        required : true
    },
    tags : {
        type  : String
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
})


module.exports = mongoose.model('BookMark' , BookMarkSchema);