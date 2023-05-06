const express = require("express")
const app = express()
const ErrorHandler = require("./middleware/error")

app.use(express.json())

// Route Imports

const product = require("./routes/productRoutes")
app.use("/api/v1", product)

// Error handler Middleware
app.use(ErrorHandler)


module.exports = app