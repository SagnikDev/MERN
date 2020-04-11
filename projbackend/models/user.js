var mongoose=require('mongoose') //Using for importing mongoose
var crypto=require('crypto');   // For creating 'sha' encrypted password
const { v1: uuidv1 } = require('uuid'); //For creating unique 'SALT' i.e. an unique id
var Schema=mongoose.Schema
//Designing a schema for USER
var userSchema=new Schema({
    name:{
        type:String,
        required:true,
        maxLength:32,
        trim:true
    },
    lastName:{
        type:String,
        maxLength:32,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    userInfo:{
        type:String,
        required:true
    },
    encry_password:{
        type:String,
        required:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchased:{
        type:Array,
        default:[]
    }
},{timestamps:true})
//Virtual functions for declaring variables
userSchema.virtual("password")
    .set(function(password){
        this._password=password //private variable
        this.salt=uuidv1(); //Unique Key
        this.encry_password=this.securePassword(password) //Calling Schema method
    })
    .get(function() {
        return this._password
    })

//Declare Schema Methods
userSchema.methods= {
    authenticate: function(plainPassword) {
        return this.securePassword(plainPassword)===this.encry_password
    }, 
    //Cryptograph the password with unique_key(salt) and make 'sha256' 
    securePassword : function(plainPassword){  
        if(!plainPassword) return "";
        try {
            return  crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');
        } catch (err) {
            return "";
        }
    }
  
}
//Export User module
module.exports=mongoose.model("User",userSchema)




// var sampleSchema = new Schema({
//   title:  String, // String is shorthand for {type: String}
//   author: String,
//   body:   String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs:  Number
//   }
// });
