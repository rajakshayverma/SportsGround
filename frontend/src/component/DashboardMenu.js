const DashboardMenu={
    render: (props)=>{
        return`
        <div class="dashboard-menu">
            <ul>
                <li class="${props.selected === 'dashboard'? 'selected':''}">
                <a href="/#/dashboard">Overview</a>
                </li>
                <li class="${props.selected === 'orders'? 'selected':''}">
                <a href="/#/orderlist">Orders</a>
                </li>
                <li class="${props.selected === 'products'? 'selected':''}">
                <a href="/#/productlist">Products</a>
                </li>
                <li class="${props.selected === 'queries'? 'selected':''}">
                <a href="/#/queries">Queries</a>
                </li>
                
            </ul>
        </div>
        `
    }
}

export default DashboardMenu