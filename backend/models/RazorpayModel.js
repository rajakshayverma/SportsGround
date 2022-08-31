import mongoose from "mongoose";


const RazorpaySchema=new mongoose.Schema({
    isPaid:Boolean,
    amount:Number,
    razorpay:{
        orderID:String,
        paymentID:String,
        signature:String,
    },
});

const razorpayorder=mongoose.model('razorpayorder', RazorpaySchema );

export default razorpayorder;