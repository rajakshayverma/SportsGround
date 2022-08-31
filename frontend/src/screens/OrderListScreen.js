import { getOrders, deleteOrder } from "../api.js";
import DashboardMenu from "../component/DashboardMenu.js"
import { getUserInfo } from "../localStorage.js";
import {HideLoading, rerender, ShowLoading, showMessage} from "../util.js"

const OrderListScreen={
    after_render:_=>{
        
        let edit_btn=document.getElementsByClassName('edit-order-btn')
        edit_btn=Array.from(edit_btn).forEach(editbutton =>{
            editbutton.addEventListener('click',_=>{
                document.location.hash=`/order/${editbutton.id}`;
            })
        })
        let delete_btn=document.getElementsByClassName("delete-order-btn")
        delete_btn=Array.from(delete_btn).forEach(deletebutton=>{
            deletebutton.addEventListener('click',async _=>{
                if(confirm("Are You Sure to Delete this order ?")){
                    ShowLoading();
                    const data=await deleteOrder(deletebutton.id);
                    if(data.error){
                        showMessage(data.error)
                    }
                    else{
                        rerender(OrderListScreen);
                    }
                    HideLoading();
                }
            })
        })
    },
    render:async _=>{
        const prodcuts= await getOrders();
        const {isAdmin}=getUserInfo()
        if(!isAdmin){
            document.location.hash="/shop"
        }
        return`
        <div class="dashboard">
        ${DashboardMenu.render({selected:'orders'})}
        <div class="dashboard-content">
        <h1>Orders</h1>
        
        <p class="mobileadmin"><br>
        <br>
        <br>Open in Laptop to view content</p>
        <div class="product-list" id="orderlist">
            <table width=100%>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>DATE</th>
                        <th>Total</th>
                        <th>User</th>
                        <th>PaidAT</th>
                        <th>DeliveredAT</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                ${prodcuts ? prodcuts.map(order=>`
                    <tr>
                        <td>${order._id}</td>
                        <td>${order.createdAt}</td>
                        <td>₹${order.totalPrice}</td>
                        <td>${order.user.name}</td>
                        <td>${order.isPaid?`${order.paidAt}`:`UnPaid`}</td>
                        <td>${order.isDelivered?`${order.deliveredAt}`:`Undelivered`}</td>
                        <td>
                        <button id=${order._id} class="edit-order-btn">Edit</button>
                        <button id=${order._id} class="delete-order-btn">Delete</button>
                        </td>
                    </tr>
                `).join("\n"):``}
                </tbody>
            </table>
        </div>
    </div>
    </div>
    `}
}

export default OrderListScreen