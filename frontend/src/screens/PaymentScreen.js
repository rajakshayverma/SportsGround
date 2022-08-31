import { getUserInfo, setPayment } from "../localStorage.js";
import CheckoutSteps from "../component/CheckoutSteps.js"

const PaymentScreen={
    after_render:_=>{
        document.getElementById('payment-form').addEventListener('submit', async (e)=>{
            e.preventDefault();
            const paymentmethod={paymentMethod:document.querySelector('input[name="payment-method"]:checked').value}
            setPayment(paymentmethod);
            document.location.hash="/placeorder";
        })

    },
    render:_=>{
        const {name}=getUserInfo();
        if(!name){
            document.location.hash="/"
        }
        return`
        ${CheckoutSteps.render({step1:true, step2:true, step3:true})}
        <div id="payment-profile">
            <form id="payment-form">
                <ul class="payment-form-items">
                <li id="Payment-text">
                    <h1>Select Payment Method</h1>
                </li>
                <li>
                    <div>
                    <input type="radio" name="payment-method" value="Full-Payment" id="paypal" />
                    Full Payment(Upi, wallet, Netbanking, Credit/Debit card)
                    </div>        
                </li>
                <li>
                    <div>  
                        <input type="radio" name="payment-method" value="Cash-On-Delivery" id="cashondelivery"  />
                        30% Advance and remaining at delivery
                    </div>
                </li>
                <li>
                    <button type="submit" id="payment-method-btn">Continue</button>
                </li>
                </ul>
            </form>
        </div>
        `
    }
}

export default PaymentScreen