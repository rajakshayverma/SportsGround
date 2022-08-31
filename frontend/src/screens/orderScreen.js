import { getOrder, deliverOrder, sendOrderMail } from "../api.js";
import { getUserInfo } from "../localStorage.js";
import {HideLoading, parseRequestUrl, rerender, ShowLoading, showMessage} from "../util.js";
import { apiUrl } from "../config.js";

export const orderScreen={
    after_render:async _=>{
        const request=parseRequestUrl()
        const {
            _id,
            shipping,
            payment,
            orderItems,
            itemsPrice,
            shippingPrice,
            totalPrice,
            isDelivered,
            deliveredAt,
            isPaid,
            paidAt,
 
        }=await getOrder(request.id)
        const maildata={
            id:_id,
            product:orderItems.map(item=>{return `${item.name}`})
        }

        if(document.getElementById('deliver-order-btn')){
            document.getElementById('deliver-order-btn').addEventListener('click',async _=>{
                ShowLoading()
                await deliverOrder(request.id);
                HideLoading()
                showMessage("Order Deliverd")
                rerender(orderScreen)
            })
        }

        if(document.getElementById('make-payment-btn')){
            document.getElementById('make-payment-btn').addEventListener('click',async _=>{
                const script=document.createElement('script');
                script.src='https://checkout.razorpay.com/v1/checkout.js';
                script.onerror=_=>{
                alert('Error')
                };
                script.onload=async _=>{
                try {        
                    const request=parseRequestUrl();
                    const orderdata={
                    amount:(await getOrder(request.id)).totalPrice+'00'
                    }
                    const userinfo=getUserInfo(request.id);
                    console.log(userinfo)
                    ShowLoading()
                    const result=await fetch(`${apiUrl}/api/razorpay/create-order`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json; charset=utf-8'
                    },
                    body:JSON.stringify(orderdata)
                    })
                    const resultdata=await result.json()
                    const {amount, id:order_id, currency} = resultdata;
                    const key=await fetch(`${apiUrl}/api/razorpay/get-razorpay-key`,{
                    headers:{
                        'Content-Type':'application/json; charset=utf-8'
                    },
                    })
                    const razorpaykey=(await key.json()).key;
                    var options = {
                    "key": razorpaykey, // Enter the Key ID generated from the Dashboard
                    "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": currency,
                    "name": "Ruhaan Sports",
                    "description": "Payment for Ruhaan Sports",
                    "image": "https://github.com/mukulgupta257/RuhaanSportsImageDB/blob/main/logo.png?raw=true",
                    "order_id": order_id, 
                    "handler":async function (response){
                        console.log(response)
                        const {token}=getUserInfo();
                        const {email}=getUserInfo();
                        console.log(email)
                        const data={
                        amount:amount,
                        razorpayPaymentId:response.razorpay_payment_id,
                        razorpayOrderId:response.razorpay_order_id,
                        razorpaySignature:response.razorpay_signature
                        }
                        const result=await fetch(`${apiUrl}/api/razorpay/pay-order/${request.id}`,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json; charset=utf-8',
                            'Authorization':`bearer+${token}`
                        },
                        body:JSON.stringify(data)
                        })
                        alert((await result.json()).message)
                        rerender(orderScreen)
                        sendOrderMail(email,maildata)
                    },
                    "prefill": {
                        "name": userinfo.name ,
                        "email": userinfo.email,
                        "contact": ""
                    },
                    "notes": {
                        "address": "Razorpay Corporate Office"
                    },
                    "theme": {
                        "color": "#203040"
                    }
                    };
                    HideLoading()
                    var paymentObject = new window.Razorpay(options);
                    paymentObject.open();
    
                } catch (error) {
                    alert(error)
                }
            }
            document.body.appendChild(script);
            })
        }

        if(document.getElementById('pay-advance')){
            document.getElementById('pay-advance').addEventListener('click',async _=>{
                const script=document.createElement('script');
                script.src='https://checkout.razorpay.com/v1/checkout.js';
                script.onerror=_=>{
                alert('Error')
                };
                script.onload=async _=>{
                try {        
                    const request=parseRequestUrl();
                    const advance=parseInt((await getOrder(request.id)).totalPrice/3)
                    console.log(advance)
                    const orderdata={
                    amount:advance+'00'
                    }
                    const userinfo=getUserInfo(request.id);
                    console.log(userinfo)
                    ShowLoading()
                    const result=await fetch(`${apiUrl}/api/razorpay/create-order`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json; charset=utf-8'
                    },
                    body:JSON.stringify(orderdata)
                    })
                    const resultdata=await result.json()
                    const {amount, id:order_id, currency} = resultdata;
                    const key=await fetch(`${apiUrl}/api/razorpay/get-razorpay-key`,{
                    headers:{
                        'Content-Type':'application/json; charset=utf-8'
                    },
                    })
                    const razorpaykey=(await key.json()).key;
                    var options = {
                    "key": razorpaykey, // Enter the Key ID generated from the Dashboard
                    "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": currency,
                    "name": "Ruhaan Sports",
                    "description": "Payment for ruhaan sports",
                    "image": "https://github.com/mukulgupta257/RuhaanSportsImageDB/blob/main/logo.png?raw=true",
                    "order_id": order_id, 
                    "handler":async function (response){
                        console.log(response)
                        const {token}=getUserInfo();
                        const {email}=getUserInfo();
                        console.log(email)
                        const data={
                        amount:amount,
                        razorpayPaymentId:response.razorpay_payment_id,
                        razorpayOrderId:response.razorpay_order_id,
                        razorpaySignature:response.razorpay_signature
                        }
                        const result=await fetch(`${apiUrl}/api/razorpay/pay-order/${request.id}`,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json; charset=utf-8',
                            'Authorization':`bearer+${token}`
                        },
                        body:JSON.stringify(data)
                        })
                        alert((await result.json()).message)
                        rerender(orderScreen)
                        sendOrderMail(email,maildata)
                    },
                    "prefill": {
                        "name": userinfo.name ,
                        "email": userinfo.email,
                        "contact": ""
                    },
                    "notes": {
                        "address": "Razorpay Corporate Office"
                    },
                    "theme": {
                        "color": "#c0c0c0"
                    }
                    };
                    HideLoading()
                    var paymentObject = new window.Razorpay(options);
                    paymentObject.open();
    
                } catch (error) {
                    alert(error)
                }
            }
            document.body.appendChild(script);
            })
        }
    },
    render:async _=>{
        const {isAdmin}=getUserInfo()
        const request=parseRequestUrl();
       const {
           _id,
           shipping,
           payment,
           orderItems,
           itemsPrice,
           shippingPrice,
           totalPrice,
           isDelivered,
           deliveredAt,
           isPaid,
           paidAt,

       }=await getOrder(request.id)
       return`
        <h1 id="order_id" style="padding:1rem 2rem;"> Order #<br>${_id} </h1>
        <div class="placeorder-parent">
            <div class="place-order">
                <div class="place-order-info">
                    <div class="details-order">
                        <h2>Shipping</h2>
                        <div>
                            ${shipping.address},${shipping.city}
                            ,${shipping.postalcode},${shipping.country}
                        </div>
                        <div> Contact Number : ${shipping.contactnumber} </div>
                        ${isDelivered?`<div class="sucess"><h3>Delivered at</h3></div>${deliveredAt}`:`<div class="error"><h3>Not Delivered</h3></div>`}
                    </div>
                    <div class="details-order">
                        <h2>Payment</h2>
                        <div>
                            Payment Method : ${payment.paymentMethod}

                            ${payment.paymentMethod==='Full-Payment' && isPaid ?`<br>Amount to be collected at delivery: ${totalPrice-(totalPrice/3)}`:``}
                        </div>
                        ${isPaid
                        ?`<div class="sucess"><h3>
                        ${payment.paymentMethod==='Full-Payment' ? `Paid at ${paidAt}</h3>`:`Advance Paid at ${paidAt}`}
                        </div>`
                        :`<div class="error"><h3>Not Paid</h3></div>`}
                    </div>
                    <div class="details-order">
                        <ul class="place-order-list-container">
                            <li>
                            <h2>Shopping cart</h2>
                            <h2>Price</h2>
                            </li>
                            ${orderItems.map(item=>`
                                <li>
                                    <div class="cart-image">
                                        <image src="${item.image}" alt="${item.name}" />
                                    </div>
                                    <div class="place-order-cart-item">
                                        <div><a href="/#/product/${item.product}">${item.name}</a></div>
                                        <div>Qty:${item.qty}</div>
                                        ${item.size ? `
                                        <div>Size:${item.size}</div>
                                        `:``}
                                    </div>
                                    <div class="cart-price">
                                        ₹${item.price}
                                    </div>
                                </li>
                                
                            `).join("\n")}
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div class="order-action">
                <ul>
                <li id="Heading-order"><h2>Order Summary</h2></li>
                <li><div>Items price : </div> <div>${itemsPrice}</div></li>
                <li><div>Shipping :  </div><div>${shippingPrice}</div></li>
                
                <li id="order-total"><div>Order Total : </div> <div>${totalPrice}</div></li>
                <br>
                    ${!isDelivered && isAdmin ? `<li><button id="deliver-order-btn" class="primary" >Delivered</button></li>` : `` }
                ${isAdmin?`<br>`:``}
                <li>
                    ${isPaid ?``
                    :
                    `${payment.paymentMethod==='Full-Payment' && !isAdmin ? `
                    <button id="make-payment-btn" class="primary" >Make Payment</button>
                    ` 
                    : `${!isAdmin ? `<button id="pay-advance" class="primary" >Pay Advance</button>` :`` }` }
                `}
                </li>
                </ul>
                </div>
        </div>
        `
    }
}

export default orderScreen