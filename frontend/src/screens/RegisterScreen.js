import { register } from "../api.js";
import { getUserInfo, setUserInfo } from "../localStorage.js";
import { HideLoading, redirectUser, ShowLoading, showMessage } from "../util.js";

const RegisterScreen={
    after_render:_=>{
        document.getElementById('register-btn').addEventListener('click', async (e)=>{
            e.preventDefault();
            if(
                document.getElementById('password').value==document.getElementById('repassword').value
            ){
                ShowLoading();
                const data= await register({
                    name:document.getElementById('name').value,
                    email:document.getElementById('email').value,
                    password:document.querySelector('#password').value
                });
                HideLoading();
                if(data.error){
                    showMessage(data.error);
                }else{
                    setUserInfo(data)
                    redirectUser()
                }
            }
            else{
                showMessage("Password should be same");
            }
        })

    },
    render:_=>{
        if(getUserInfo().name){
            document.location.hash="/"
        }
        return`
        <div class="form-container">
            <form id="register-form">
                <ul class="form-items" id="registerformitems">
                <li id="register-text">
                    Create Your Account
                </li>
                <li>
                    <input type="name" name="name" id="name" placeholder="Full Name" required />
                </li>
                <li>
                    <input type="email" name="email" id="email" placeholder="Email" required />
                </li>
                <li>
                    <input type="password" name="password" placeholder="Password" id="password" minlength="8" required />
                </li>
                <li>
                    <input type="password" name="repassword" placeholder="Verify Password" id="repassword" minlength="8" required />
                </li>
                <li>
                    <button type="submit" id="register-btn">Register</button>
                </li>
                <li>
                    <div>Already have an account? <a href="/#/signin">Log-in</a></div>
                </li>
                </ul>
            </form>
        </div>
        `
    }
}

export default RegisterScreen