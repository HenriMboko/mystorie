const mongoose = require('mongoose');
const config = require('./config')



const url = config.mongoUrl;
const con = mongoose.connect(url);

con.then((db)=>{
    console.log("Server connect to mongoDb succesful ....")
})
.catch((error)=>console.log(error));


