import config from "./config"
import jwt from 'jsonwebtoken'

export const generateToken=(user)=>{
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
    },
    config.JWT_SECRET
    )
}

export const isAuth=(req, res, next)=>{
    const bearertoken=req.headers.authorization;
    if(!bearertoken){
        res.status(401).send({message:"Token Not Supplied"})
    }
    else{
        const token=bearertoken.slice(7,bearertoken.length);
        jwt.verify(token,config.JWT_SECRET,(err,data)=>{
            if(err){
                res.status(401).send({message:"Invalid Token"})
            }
            else{
                req.user=data;
                next();
            }

        })
    }
}

export const isAdmin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401).send({message:"Token not valid for admin user"})
    }
}