export const setsize=(productsize)=>{
    const size={
        "size":productsize
    }
    localStorage.setItem('size', JSON.stringify(size))
}

export const getsize=_=>{
    const productsize=localStorage.getItem('size')?
    JSON.parse(localStorage.getItem('size'))
    :[];
    return productsize;
}
export const removesize=_=>{
    localStorage.removeItem('size')
}

export const getCartItems=_=>{
    const cartItems=localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems'))
    :[];
    return cartItems;
}

export const setCartItems=(cartItems)=>{
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export const cleanCart=_=>{
    localStorage.removeItem('cartItems')
}

export const setUserInfo=({
    _id="",
    name="",
    email="",
    password="",
    token="",
    isAdmin=false

})=>{
    localStorage.setItem('userInfo',JSON.stringify({
        _id,name,email,password,token,isAdmin
    })) 
}

export const clearUser=_=>{
    localStorage.removeItem('userInfo')
}

export const getUserInfo=_=>{
    return localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):
    {name:"",email:"",password:""}
}

export const getShipping=()=>{
    const shipping=localStorage.getItem('shipping')?
    JSON.parse(localStorage.getItem('shipping')) : 
    {
        contactnumber:"",
        city:"",
        address:"",
        postalcode:"",
        country:""
    }
    return shipping
}

export const setShipping=({
        contactnumber="",
        city="",
        address="",
        postalcode="",
        country=""
})=>{
    localStorage.setItem('shipping',JSON.stringify({contactnumber, address, city, postalcode, country}))
}
export const getPayment=()=>{
    const payment=localStorage.getItem('payment')?
    JSON.parse(localStorage.getItem('payment')) : 
    {
        paymentMethod:"paytm"
    }
    return payment
}

export const setPayment=({paymentMethod=""})=>{
    localStorage.setItem('payment',JSON.stringify({paymentMethod}))
}