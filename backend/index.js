import express from "express"
import {PORT,mongoDBURL} from "./config.js"
import mongoose from "mongoose"
import {Book} from "./models/book.model.js"
import booksRoute from "./routes/booksRoute.js"
import cors from "cors"

const app=express();

//Middleware for req.body parsing
app.use(express.json());

//middleware for cors 
app.use(
  cors({
    origin:"http://localhost:3000",
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type']
  })
);



//INITIALISE / ROUTE
app.get('/',(req,res)=>{
  console.log(req);
  return res.status(200).send("Pehla sending msg");
  
});

app.use('/books',booksRoute)


//DB CONNECTION AND PORT CONNECTION
mongoose
  .connect(mongoDBURL)
  .then(()=>{
    console.log("CONNECTED TO DATABASE");
    app.listen(PORT,()=>{
      console.log(`APP IS LISTENING TO PORT ${PORT}`);
    })  
  })
  .catch((error)=>{
    console.log(`ERROR :: INDEX.JS ::  ${error}`);
  })



