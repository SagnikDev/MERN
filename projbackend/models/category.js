const mongoose=require('mongoose')  //Using for importing mongoose
// Creating Category schema
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        unique:true
    },
},{timestamps: true})
//Exporting the schema
module.exports=mongoose.model('Category',categorySchema)