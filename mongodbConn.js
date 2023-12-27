const mongoose = require('mongoose')
require('dotenv').config()
async function MongoDbConnect(){
    try{
       await mongoose.connect(process.env.DB_Connection)
       console.log('Mongodb is Connected')
    }
    catch(err){
        console.log('Mongodb Connection Failed')
    }
}

module.exports = MongoDbConnect