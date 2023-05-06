const app = require("./app")

const dotenv = require("dotenv")
const Live  = process.env.PORT || 4000

const connectionDatabase = require("./config/database")

// Hadling Uncaught exceptions

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutdown server due to Uncaught exceptions")
    server.close(()=>{
        process.exit(1)
    })

})

// config

dotenv.config({path:"backend/config/config.env"})

 

// connnect to database

connectionDatabase()



const server = app.listen(Live,()=>{
    console.log(`Server is live on http://localhost:${Live}`)
   
})


// Unhandled Promise Rejection 

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutdown server due to unhandled Promise Rejection");
    server.close(()=>{
        process.exit(1)
    })
})
    
