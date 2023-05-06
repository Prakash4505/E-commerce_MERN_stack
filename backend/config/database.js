const mongoose = require("mongoose")
const DB_URI = "mongodb+srv://commerce:commerce@clusterone.omylfvq.mongodb.net/Ecommerce?retryWrites=true&w=majority";


const connectDatabase = ()=>{
    mongoose.connect(DB_URI, { useNewUrlParser:true, useUnifiedTopology: true }).then(
        (data) => {
            console.log(`MongodbAtlas connected to server ${data.connection.host}`)
        })
}

module.exports = connectDatabase;
