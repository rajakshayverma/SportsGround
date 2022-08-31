import { CreateOrder, sendOrderMail } from "../api.js";
import CheckoutSteps from "../component/CheckoutSteps.js";
import { getCartItems, getShipping, getPayment, cleanCart } from "../localStorage.js"
import { HideLoading, ShowLoading, showMessage } from "../util.js";


const convertCarttoOrder=_=>{
    const orderitems=getCartItems();
    if(orderitems.length==0){
        document.location.hash="/cart"
    }
    const shipping=getShipping();
    if(!shipping.address){
        document.location.hash="/shipping"
    }
    const payment=getPayment();
    if(!payment.paymentMethod){
        document.location.hash="/payment"
    }
    const itemsPrice = orderitems.reduce((a,c) => a + c.price * c.qty , 0);
    let shippingPrice= 200;
    if(itemsPrice>10000){
        shippingPrice=0;
    }
    const totalPrice=itemsPrice + shippingPrice;
    return{
        orderitems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        totalPrice
    }
}

export const PlaceorderScreen={
    after_render:async _=>{
        
        document.getElementById('placeorder-btn').addEventListener('click',async _=>{
        const order=convertCarttoOrder();
        console.log(order)
        ShowLoading();
        const data= await CreateOrder(order);
        HideLoading();
        if(data.error){
            showMessage(data.error)
        }else{
            cleanCart();
            document.location.hash=`/order/${data.order._id}`;
        }
    })
    },
    render:_=>{
        const {
        orderitems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        totalPrice
        }=convertCarttoOrder();
        return`
        ${CheckoutSteps.render({step1:true, step2:true, step3:true, step4:true })}
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
                    </div>
                    <div class="details-order">
                        <h2>Payment</h2>
                        <div>
                            Payment Method : ${payment.paymentMethod}
                        </div>
                    </div>
                    <div class="details-order">
                        <ul class="place-order-list-container">
                            <li>
                            <h2>Shopping cart</h2>
                            <h2>Price</h2>
                            </li>
                            ${orderitems.map(item=>`
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
                <li id="btn-container"><button id="placeorder-btn">Place Order</button>
                </ul>
            </div>
        </div>
        `
    }
}

export default PlaceorderScreen