const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        
        
        title:String,
        category:String,
        description:String,
        image:String,
        quantity:Number,
        price:Number,

    },
    { 
        timestamps:true
    }
)

const productModel =mongoose.model("product",productSchema)
module.exports = productModel