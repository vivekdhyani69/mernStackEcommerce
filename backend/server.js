const app =  require('./app');
const dotenv = require('dotenv');
const connectDatabase = require("./config/database")//connectDatabase ise call krte he database connects

///Handling Uncaught exceptions
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due toUncaught exceptions`);

    process.exit(1);
})

//Config 
dotenv.config({path : "backend/config/config.env"})

//connecting database
connectDatabase()

//Listening our server port
const server = app.listen(process.env.port,()=>{
console.log(`Server is running on http://localhost:${process.env.port}`);
})

process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting downn the server due to handled PromiseRejection`);

    server.close(()=>{
        process.exit(1);
    });
});