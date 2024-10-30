const express = require("express");
const router = express.Router();
const ProductModel = require("../model/ProductModel"); 
const Constant = require("../Constant");    
router.post('/addProduct', async(req, res) => {
    try{
        const {productName,productRate,url,description,ProductId,ProductStatus} = req.body;
        let List = {};
        List.productName = productName;
        List.productRate = productRate;
        List.url = url;
        List.description = description;
        List.status = ProductStatus;
        let failure = "";
       
        let ProductDetails = await ProductModel.findOne({productName});
        
        if(ProductDetails && productName){
            failure = {productNameFailure:Constant.productNameFailure}
        }
        
        if(!failure){
            let productModel = new ProductModel(List) 
            let products = await productModel.save();
            if(products){
                res.status(200).json({
                    success:"Product added successfully"
                }) 
            }
        }else{
            res.status(200).json({
                failure
            });
        }
                
    }catch(e){
        res.status(400).json({ msg: e.message, success: false });
    }
   
});
router.post('/editProduct', async(req, res) => {
    try{
        const {productName,productRate,url,description,ProductId,ProductStatus} = req.body;
        let List = {};
        List.productName = productName;
        List.productRate = productRate;
        List.url = url;
        List.description = description;
        //List.status = ProductStatus;
        let ProductDetails = await ProductModel.findOne({productName});
        let failure = "";
        if(ProductDetails && productName){
            failure = {productNameFailure:Constant.productNameFailure}
        }
        
        if(!failure){
            let products =await ProductModel.findOneAndUpdate({"_id":ProductId},List);
            if(products){
                res.status(200).json({
                    success:"Product Edited successfully",
                    products
                }) 
            }
        }else{
            res.status(200).json({
                failure
            });
        }
                
    }catch(e){
        res.status(400).json({ msg: e.message, success: false });
    }
   
});

router.delete('/deleteProduct', async(req, res) => {
    try{
        const {ProductId} = req.body;
            await ProductModel.findOneAndDelete({"_id":ProductId})
            .then(function(data){
                res.status(200).json({
                    success:"List deleted Successfully"
                })     
             })
             .catch(function(error){
                res.status(500).json({
                    success:"Not deleted"
                });
             })
            
                
    }catch(e){
        res.status(400).json({ msg: e.message, success: false });
    }
   
});
router.get('/getProduct', async(req, res) => {
    try{
        let ProductDetails = await ProductModel.find();
        if(ProductDetails){
                res.status(200).json({
                    success:"Product added successfully",
                    ProductList:ProductDetails
                });
        }else{
            res.status(200).json({
                failure:"No Products",
            });
        }
                
    }catch(e){
        res.status(400).json({ msg: e.message, success: false });
    }
   
});
module.exports = router;
