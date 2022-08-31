const nodemailer=require('nodemailer')
import express from "express";
import expressAsyncHandler from "express-async-handler";
import {isAuth} from '../utils';
import User from "../models/userModel";


const mailRouter=express.Router();

mailRouter.post('/enquiry/sendadmin' , expressAsyncHandler(async (req, res)=>{
    const details={
        name:req.body.name,
        email:req.body.email,
        phone_number:req.body.phonenumber,
        subject:req.body.subject,
        message:req.body.message
    }
    const transport=nodemailer.createTransport({
        service:'hotmail',
        auth:{
            user:"superlativecreationsjanakpuri@outlook.com",
            pass:"ibx_1212"
        }
    });
    const sendermail="superlativecreationsjanakpuri@outlook.com";
    const mailbody={
        from:`Ruhaan Sports ${sendermail}`,
        to:`mukulgupta257@gmail.com,vikaschhabra936@gmail.com`,
        subject:"New Enquiry",
        text:JSON.stringify(details)
    }
    transport.sendMail(mailbody,(err,info)=>{
        if(err){
            res.status(404).send({message:err}) 
        }
        res.send({message:`sentmail to ${info.response}`})
    })
}) )


mailRouter.post('/:id',isAuth , expressAsyncHandler(async (req,res)=>{
    try {
        const orderuser= User.findById(req.params.id)
        const id=req.body.id;
        const product=req.body.product;
        const mail=req.params.id ;
        if(orderuser){
        const transport=nodemailer.createTransport({
            service:'hotmail',
            auth:{
                user:"superlativecreationsjanakpuri@outlook.com",
                pass:"ibx_1212"
            }
        })
        const sendermail="superlativecreationsjanakpuri@outlook.com"
        const mailbody={
            from:`Ruhaan Sports ${sendermail}`,
            to:mail,
            subject:"Order Placed Sucessfully",
            text:`Congratulations Your order for ${product} is placed with order id ${id} at ruhaan sports love arena`
        }
        transport.sendMail(mailbody,(err,info)=>{
            if(err){
                res.status(404).send({message:err}) 
            }
            res.send({message:`sentmail to ${req.params.id}`})
        })
    }
    } catch (error) {
        console.log(error)
    } 
}))




export default mailRouter