const express = require('express');
const errorMiddelware = require("./middelware/error")///Global Error handler midddelware

const cookieParser = require("cookie-parser")
const app = express();
app.use(express.json())
app.use(cookieParser());
//All Route Imports

const product = require("./routes/productRoute")
const user = require('./routes/userRoute')
app.use("/api/v1",product)
app.use("/api/v1",user)
//Middelware for error
app.use(errorMiddelware)

module.exports =app;