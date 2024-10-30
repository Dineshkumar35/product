const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ListRouter = require("./Routes/ListRouter")
const app = express();
app.use(bodyParser.json());
//const mongoURI = "mongodb+srv://userDetails:Dk3536@todo-vmya9.mongodb.net/test?retryWrites=true&w=majority";
//mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false}); 
mongoose.connect("mongodb://localhost:27017/Products",{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false}); 
app.use("/",ListRouter);
    
app.listen(4000);