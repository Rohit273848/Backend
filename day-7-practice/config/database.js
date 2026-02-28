const mongoose = require('mongoose');

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("🍂📊 Database Connected Successfuly");
        
    })
}

module.exports = connectToDB;