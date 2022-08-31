import { signin } from "../api.js";
import { getUserInfo, setUserInfo } from "../localStorage.js";
import { HideLoading, redirectUser, ShowLoading, showMessage } from "../util.js";

const signinScreen={
    after_render:_=>{
        document.getElementById('signin-form').addEventListener('submit', async (e)=>{
            e.preventDefault();
            ShowLoading();
            const data= await signin({
                email:document.getElementById('email').value,
                password:document.querySelector('#password').value
            });
            HideLoading();
            if(data.error){
                showMessage("Invalid Username or Password");
            }else{
                setUserInfo(data)
                redirectUser()
            }
        })

    },
    render:_=>{
        if(getUserInfo().name){
            redirectUser()
        }
        return`
        <div class="form-container" id="signinformcontainer">
            <form id="signin-form">
                <ul class="form-items" id="signinformitems">
                <li>
                    Ruhaan Sports 
                </li>
                <li>
                    <input type="email" name="email" id="email" placeholder="Email"  />
                </li>
                <li>
                    <input type="password" name="password" placeholder="Password" id="password"  />
                </li>
                <li>
                    <button type="submit" id="sign-in-btn">Log-in</button>
                </li>
                <li>
                    <div>New user? <a href="/#/register">Create Your Account</a></div>
                </li>
                </ul>
            </form>
        </div>
        `
    }
}

export default signinScreen