import express from 'express';
import expressAsyncHandler from "express-async-handler";
import query from '../models/queryModel';
import { isAdmin, isAuth } from "../utils.js";

const queryRouter=express.Router()

queryRouter.get('/getquery/:id',isAuth, isAdmin, expressAsyncHandler(async (req, res)=>{
    const queries=await query.findById(req.params.id);
    res.send(queries)
}) )

queryRouter.post('/createquery', expressAsyncHandler(
    async (req,res)=>{
    const createquery= new query({
        name:req.body.name,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        subject:req.body.subject,
        message:req.body.message,
    })
    const createdQuery=await createquery.save();
    if(!createdQuery){
        res.status(401).send({
            message:"Invalid Query data"
        });
    }else{
        res.send({
            _id:createdQuery._id,
            name:createdQuery.name,
            email:createdQuery.email,
            phonenumber:createdQuery.phonenumber,
            subject:createdQuery.subject,
            message:createdQuery.message,
        })
    }
}))

queryRouter.get('/getquery',isAuth, isAdmin, expressAsyncHandler(async (req, res)=>{
    const queries=await query.find({});
    res.send(queries)
}) )


queryRouter.delete('/delete/:id', isAuth, isAdmin, expressAsyncHandler(async (req,res)=>{
    const queries=await query.findById(req.params.id);
    if(queries){
        const deltequery=await queries.remove();
        res.send({message:"query deleted sucessfuly", query:deltequery})
    }else{
        res.status(404).send({message:"query not found"})
    }
}))
export default queryRouter