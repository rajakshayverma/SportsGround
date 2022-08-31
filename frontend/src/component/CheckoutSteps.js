const CheckoutSteps={
    render:(props)=>{
        return `
            <div class="checkout-steps">
            <div class="${props.step1?"active":"empty"}">&ensp;Sign In&ensp;&ensp;&ensp;</div>
            <div class="${props.step2?"active":"empty"}">&ensp;Shipping&ensp;&ensp;&ensp;</div>
            <div class="${props.step3?"active":"empty"}">&ensp;Payment&ensp;&ensp;&ensp;</div>
            <div class="${props.step4?"active":"empty"}">&ensp;Place Order&ensp;</div>
            </div>
        `
    }
}

export default CheckoutSteps