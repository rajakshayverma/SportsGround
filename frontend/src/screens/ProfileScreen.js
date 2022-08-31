import { getMyOrders, update } from "../api.js";
import { getUserInfo, setUserInfo, clearUser } from "../localStorage.js";
import { HideLoading, ShowLoading, showMessage } from "../util.js";

const ProfileScreen={
    after_render:_=>{
        
        document.getElementById('signout-btn-profile-page').addEventListener('click',_=>{
            clearUser()
            document.location.hash="/"
        })
        document.getElementById('profile-form').addEventListener('submit', async (e)=>{
            e.preventDefault();
            ShowLoading();
            const data= await update({
                name:document.getElementById('name').value,
                email:document.getElementById('email').value,
                password:document.querySelector('#password').value
            });
            HideLoading();
            if(data.error){
                showMessage(data.error);
            }else{
                setUserInfo(data)
                document.location.hash="/"
            }
        })

    },
    render:async _=>{
        const {name,email}=getUserInfo();
        if(!name){
            document.location.hash="/"
        }
        const orders=await getMyOrders()
        return`
        <div class="profile">
            <div id="user-profile">
                <form id="profile-form">
                    <ul class="profile-form-items">
                    <li id="profile-text">
                        <h1>User profile</h1>
                    </li>
                    <li>
                        <input type="name" value="${name}" name="name" id="name" placeholder="Full Name"  />
                    </li>
                    <li>
                        <input type="email" value="${email}" name="email" id="email" placeholder="Email"  />
                    </li>
                    <li>
                        <input type="password" name="password" placeholder="New Password" id="password"  />
                    </li>
                    <li id="update-btn-container">
                        <button type="submit" id="update-btn">Update</button>
                    </li>
                    <li id="signout-btn-profile-container">
                        <button type="submit" id="signout-btn-profile-page">Sign Out</button>
                    </li>
                    </ul>
                </form>
            </div>
            <div class="profile-orders">
                <h1>Order History</h1>
                <hr>
                <br>
                <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Total Price</th>
                        <th>Payment</th>
                        <th>Delivered</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.length===0?`<tr rowspan="4"><td colspan="6" style="text-align:center;font-size:2rem;">No Orders Found</td></tr>`:
                    orders.map(order=>`
                    <tr>
                    <td>${order._id}</td>
                    <td>${order.createdAt}</td>
                    <td>${order.totalPrice}</td>
                    <td>${order.paidAt || 'Not Paid'}</td>
                    <td>${order.deliveredAt || 'Not Delivered'}</td>
                    <td><a href="/#/order/${order._id}">Order Details</a></td>
                    <tr>
                    `).join("\n") 
                }
                </tbody>
            </div>
        
        </div>
        `
    }
}

export default ProfileScreen