

import { apiUrl } from "./config.js";
import { getUserInfo } from "./localStorage.js";

export const getProduct = async (id) =>{
    try{
        const response= await fetch(`${apiUrl}/api/products/${id}`,{
            method:'GET',
            "headers":{
                "Content-type":"application/json",
            }})
            if(!response || !response.ok){
                return`<div>Error in getting data</div>`
            }
            return await response.json();
    }catch(err){
        console.log(err);
        return {err : err.message};
    }
}
export const getProducts = async ({searchKeyword=""}) =>{
    try{
        let queryString="?";
        if(searchKeyword){queryString +=`searchKeyword=${searchKeyword}&`}
        const response= await fetch(`${apiUrl}/api/products${queryString}`,{
            method:'GET',
            "headers":{
                "Content-type":"application/json",
            }})
            if(!response || !response.ok){
                return`<div>Error in getting data</div>`
            }else{
                return await response.json();
            }
    }catch(err){
        console.log(err);
        return {err : err.message};
    }
}

export const createProduct=async _=>{
    try{
        const {token}=getUserInfo();
        const response= await fetch(`${apiUrl}/api/products`,{
            method:'POST',
            "headers":{
                "Content-type":"application/json",
                'Authorization':`bearer+${token}`
            }})
            const res= await response.json()
            if(response.statusText!='Created'){
                throw new Error(res.data.message)
            }
            return res;
    }catch(err){
        return {err : err.message};
}
}

export const deleteProduct=async (id)=>{
    try{
        const {token}=getUserInfo();
        const response= await fetch(`${apiUrl}/api/products/${id}`,{
            method:'DELETE',
            "headers":{
                "Content-type":"application/json",
                'Authorization':`bearer+${token}`
            }})
            const res= await response.json()
            if(!response.ok){
                throw new Error(res.data.message)
            }
            return res;
    }catch(err){
        return {err : err.message};
}
}

export const updateProduct=async (product)=>{
    try{
        const {token}=getUserInfo();
        const response= await fetch(`${apiUrl}/api/products/${product._id}`,{
            method:'PUT',
            "headers":{
                "Content-type":"application/json",
                'Authorization':`bearer+${token}`
            },
        body:JSON.stringify(product)
        })
            const res= await response.json()
            if(!response.ok){
                throw new Error(res.data.message)
            }
            return res;
    }catch(err){
        return {err : err.message};
}
}



export const signin=async({email,password})=>{
    try{
        const response= await fetch(`${apiUrl}/api/users/signin`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({email,password})
        })
        const res= await response.json()
        if(!response.ok){
            throw new Error(res.message)
        }
        return res;
    }catch(err){
        
        console.log(err);
        return {error:   err.message}
    }
}

export const register=async({name,email,password})=>{
    try{
        const response= await fetch(`${apiUrl}/api/users/register`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({name,email,password})
        })
        const res= await response.json()
        if(!response.ok){
            throw new Error(res.message)
        }
        return res;
    }catch(err){
        console.log(err);
        return {error: err.message}
    }
}

export const update=async({name,email,password})=>{
    try{
        const {_id,token}=getUserInfo();
        const response= await fetch(`${apiUrl}/api/users/${_id}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`bearer+${token}`
              },
            body:JSON.stringify({name,email,password})
        })
        const res= await response.json()
        if(!response.ok){
            throw new Error(res.message)
        }
        return res;
    }catch(err){
        console.log(err);
        return {error: err.message}
    }
}

export const CreateOrder= async (order)=>{
    try{
        const {token}=getUserInfo();
        const response=await fetch(`${apiUrl}/api/orders`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`bearer+${token}`
            },
            body:JSON.stringify(order)
        })
        const res= await response.json()
        if(response.statusText!='Created'){
            throw new Error(res.data.message)
        }
        return res;
    }catch(err){
        return { err : err.message }
    }
}

export const getOrders = async (id) =>{
    try{
        const {token}=getUserInfo();
        const response= await fetch(`${apiUrl}/api/orders`,{
            method:'GET',
            "headers":{
                "Content-type":"application/json",
                'Authorization':`bearer+${token}`
            }})
            if(!response || !response.ok){
                return`<div>Error in getting data</div>`
            }
            return await response.json();
    }catch(err){
        console.log(err);
        return {err : err.message};
    }
}

export const deleteOrder=async (id)=>{
    try{
        const {token}=getUserInfo();
        const response= await fetch(`${apiUrl}/api/orders/${id}`,{
            method:'DELETE',
            "headers":{
                "Content-type":"application/json",
                'Authorization':`bearer+${token}`
            }})
            const res= await response.json()
            if(!response.ok){
                throw new Error(res.data.message)
            }
            return res;
    }catch(err){
        return {err : err.message};
}
}

export const getOrder=async(id)=>{
    const {token}=getUserInfo();
    try{
        const response=await fetch(`${apiUrl}/api/orders/${id}`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`bearer+${token}`
            }
        })
        const res=await response.json()
        if(!response.ok){
            throw new Error(response.data.message)
        }
        else {
            return res
        }
    }catch(err){
        return {error:err.message}
    }
}

export const sendOrderMail=async (id,data)=>{
    const {token}=getUserInfo();
    try{
        const response=await fetch(`${apiUrl}/api/sendordermail/${id}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`bearer+${token}`
            },
            body:JSON.stringify(data)
        })
        const res=await response.json()
        if(!response.ok){
            throw new Error(response.data.message)
        }
        else {
            return res
        }
    }catch(err){
        return {error:err.message}
    }
}

export const sendEnquiryMail=async (query)=>{
    try{
        const {token}=getUserInfo();
        const response=await fetch(`${apiUrl}/api/sendordermail/enquiry/sendadmin`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`bearer+${token}`
            },
            body:JSON.stringify(query)
        })
        const res=await response.json()
        if(!response.ok){
            throw new Error(response.data.message)
        }
        else {
            return res
        }
    }catch(err){
        return {error:err.message}
    }
}

export const getMyOrders=async _=>{
    const {token}=getUserInfo();
    try{
        const response=await fetch(`${apiUrl}/api/orders/mine`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`bearer+${token}`
            }
        })
        const res=await response.json()
        if(!response.ok){
            throw new Error(response.data.message)
        }
        else {
            return res
        }
    }catch(err){
        return {err: err.message}
    }
}

export const deliverOrder=async (orderid)=>{
    const {token}=getUserInfo();
    try{
        const response=await fetch(`${apiUrl}/api/orders/${orderid}/deliver`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`bearer+${token}`
            }
        })
        const res=await response.json()
        if(!response.ok){
            throw new Error(response.data.message)
        }else{
            return res
        }
    }catch(err){
        return {err: err.message}
    }
}

export const getSummary=async _=>{
    try{
        const {token}=getUserInfo();
        const response=await fetch(`${apiUrl}/api/orders/summary`,{
            headers:{
                'Authorization':`bearer+${token}`,
                'Content-Type': 'application/json',
            }
        })
        const res=await response.json()
        if(!response.ok){
            throw new Error(response.data.message)
        }else{
            return res
        }
    }catch(err){
        console.log({message:err.message})
    }
}

export const createQuery=async (userquery)=>{
    try{
        const response= await fetch(`${apiUrl}/api/query/createquery`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(userquery)
        })
        const res= await response.json()
        if(!response.ok){
            throw new Error(res.message)
        }
        return res;
    }catch(err){
        return {err}
    }
}

export const getQuery=async ()=>{
    try{
        const {token}=getUserInfo();
        const response= await fetch(`${apiUrl}/api/query/getquery`,{
            method:'GET',
            headers: {
                'Authorization':`bearer+${token}`,
                'Content-Type': 'application/json'
              },
        })
        const res= await response.json()
        if(!response.ok){
            throw new Error(res.message)
        }
        return res;
    }catch(err){
        console.log({err:err.message})
    }
}

export const getQueryByID=async (queryid)=>{
    const {token}=getUserInfo();
    try{
        const response=await fetch(`${apiUrl}/api/query/getquery/${queryid}`,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`bearer+${token}`
            }
        })
        const res=await response.json()
        if(!response.ok){
            throw new Error(response.data.message)
        }else{
            return res
        }
    }catch(err){
        return {err: err.message}
    }
}
export const deleteQuery=async (id)=>{
    try{
        const {token}=getUserInfo();
        const response= await fetch(`${apiUrl}/api/query/delete/${id}`,{
            method:'DELETE',
            "headers":{
                "Content-type":"application/json",
                'Authorization':`bearer+${token}`
            }})
            const res= await response.json()
            if(!response.ok){
                throw new Error(res.data.message)
            }
            return res;
    }catch(err){
        return {err : err.message};
}
}
export const createReview=async (id,review)=>{
    try {
        const data=review;
        const { token } = getUserInfo();
        const response = await fetch(`${apiUrl}/api/products/${id}/reviews`,{
          method: 'POST',
          "headers": {
            'Content-Type': 'application/json',
            'Authorization':`bearer+${token}`,
          },
          body:JSON.stringify(data),
        });
        if (response.statusText !== 'Created') {
          throw new Error(response.data.message);
        }
        console.log(await response.json)
        return await response.json;
      } catch (err) {
        return { error: err.message };
      }
}