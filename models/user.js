const mongoose = require('mongoose');
const Shema = mongoose.Schema;


const UserShema  = new Shema({
    googleId : {
        type : String,
        required : true,
    },
    displayName : {
        type : String,
        required : true,
    },
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    image : {
        type : String,
    },
    createAt : {
        type : Date,
        default : Date.now,
    }
}, {timestamps : true})



const User = mongoose.model('users',UserShema);


module.exports = User;