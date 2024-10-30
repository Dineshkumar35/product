const mongoose = require("mongoose");
let productSchema = mongoose.Schema({
   productName:{
       type:String,
       required:true
   },
   productRate:{
       type:String,
       required:true
   },
   url:{
       type:String,
       required:true
   },
   description:{
       type:String,
       required:true
   },
   status:{
    type:String,
    required:true
   }
});

let userModel = module.exports = mongoose.model("productDetail",productSchema,"productDetail")