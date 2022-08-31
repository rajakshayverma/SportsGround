import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phonenumber:{type:Number, required:true},
    subject:{type:String, required:true, default:"Query regarding Sports Ground"},
    message:{type:String, required:true}   
})

const query= mongoose.model('query', querySchema);
export default query;