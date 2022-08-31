import config from '../config';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Razorpay from 'razorpay'
import razorpayorder from '../models/RazorpayModel';
import Order from '../models/OrderModel';
import { isAuth } from '../utils';

const razorpayrouter=express.Router();

razorpayrouter.get('/get-razorpay-key',(req,res)=>{
    res.send({key:config.Razorpay_KEY_ID})
})

razorpayrouter.post('/create-order',expressAsyncHandler(async (req,res)=>{
    try {
        var instance = new Razorpay({ 
            key_id: config.Razorpay_KEY_ID, 
            key_secret: config.Razorpay_KEY_SECRET 
        })
        var order=await instance.orders.create({
        amount: req.body.amount,
        currency: "INR",
        })
        res.send(order)
    } catch (error) {
        res.status(500).send(error)
    }
}) )

razorpayrouter.post('/pay-order/:id', isAuth, async (req,res)=>{
    try {
        const {amount, razorpayPaymentId, razorpayOrderId, razorpaySignature}=req.body;
        const newpayment= razorpayorder({
            isPaid:true,
            amount:amount,
            razorpay:{
            orderID:razorpayOrderId,
            paymentID:razorpayPaymentId,
            signature:razorpaySignature,
            },
        })
        await newpayment.save();
        const order=await Order.findById(req.params.id);
        if(order){
            order.isPaid=true;
            order.paidAt=Date.now();
            const updateOrder=await order.save();
            res.send({message:"order delivered",order:updateOrder})
        }else{
            res.status(404).send({message:"Order not found"})
        }
        res.send({message:'Payment Sucessful'})
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

export default razorpayrouter;