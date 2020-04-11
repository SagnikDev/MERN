const mongoose=require('mongoose'); //Using to importing mongoose
const {ObjectId}=mongoose.Schema;   //Using to refering another object

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    description:{
        type:String,
        trim:true,
        required:true,
        maxlength:2000 
    },
    price:{
        type:Number,
        required:true,
        maxlength:32,
        trim:true 
    },
    //Refering Category Object
    category:{
        type:ObjectId,
        ref:'Category',
        required:true
    },
    stock:{
        type:Number
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true})
//Exporting the Schema
module.exports=mongoose.model('Product',productSchema)