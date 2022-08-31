import express from "express";
import expressAsyncHandler from "express-async-handler";
import {isAdmin, isAuth} from '../utils';
import Order from "../models/OrderModel";
import User from "../models/userModel";

const orderRouter=express.Router();

orderRouter.get('/summary', isAuth, isAdmin, expressAsyncHandler(async (req,res)=>{
    
    const order= await Order.aggregate([{
        $group:{
            _id:null,
            numOrders:{$sum:1},
            totalprice:{$sum:"$totalPrice"}
        }
    }])
    const person= await User.aggregate([{
        $group:{
            _id:null,
            numUsers:{$sum:1}
        }
    }])
    res.send({user:person , order})
}))

orderRouter.get('/',isAuth, isAdmin, expressAsyncHandler(async (req, res)=>{
    const order=await Order.find({}).populate('user');
    res.send(order)
}) )

orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req,res)=>{
    const orders = await Order.find({user:req.user._id})
    res.send(orders)

}))
orderRouter.get('/:id', isAuth , expressAsyncHandler(async (req , res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order)
    }
    else{
        res.status(404).send({message:"Order Not Found"})
    }
}))


orderRouter.post("/", isAuth, expressAsyncHandler(
    async (req,res)=>{
        const order=new Order({
            orderItems:req.body.orderitems,
            user:req.user._id,
            shipping:req.body.shipping,
            payment:req.body.payment,
            itemsPrice:req.body.itemsPrice,
            taxPrice:req.body.tax,
            shippingPrice:req.body.shippingPrice,
            totalPrice:req.body.totalPrice,
        }) 
        const createdOrder=await order.save();
        res.status(201).send({message:'New Order Created',order:createdOrder})
    })
)

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req,res)=>{
    const order= await Order.findById(req.params.id)
    if(order){
        const deletedorder=await order.remove();
        res.send({message:"Order deleted sucessfuly", order:deletedorder})
    }else{
        res.status(404).send({message:"Order not found"})
    }
}))
orderRouter.put('/:id/deliver', isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id);
    if(order){
        order.isDelivered=true;
        order.deliveredAt=Date.now();
        const updateOrder=await order.save();
        res.send({message:"order delivered",order:updateOrder})
    }else{
        res.status(404).send({message:"Order not found"})
    }
}))


export default orderRouter;