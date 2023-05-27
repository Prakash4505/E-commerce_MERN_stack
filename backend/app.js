const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const ErrorHandler = require("./middleware/error")

app.use(express.json())
app.use(cookieParser())

// Route Imports

const product = require("./routes/productRoutes") 
const user = require("./routes/userRoutes")
app.use("/api/v1", user);
app.use("/api/v1", product);

// Error handler Middleware
app.use(ErrorHandler)


module.exports = app