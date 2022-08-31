import { createQuery, sendEnquiryMail } from "../api"

const ContactUsScreen={
    after_render:_=>{
        document.getElementById('my-form').addEventListener('submit',(e)=>{
            e.preventDefault();
        })
        document.getElementById('my-form-button').addEventListener('click', async (e)=>{
            e.preventDefault();
            const query={
                name:document.getElementById('contact-name').value,
                email:document.getElementById('contact-mail').value,
                phonenumber:document.getElementById('contact-phone-number').value,
                subject:document.getElementById('Contact-Subject').value,
                message:document.getElementById('contact-message').value,
            }
            const createquery= await createQuery(query);
            if(createquery.err){
                document.getElementById('my-form-status').classList.add('error')
                document.getElementById('my-form-status').innerText="Error in Submission";
            }else{
                document.getElementById('my-form-status').classList.remove('error')
                document.getElementById('my-form-status').classList.add('sucess')
                document.getElementById('my-form-status').innerText="Response Submitted";
                const sendmail=await sendEnquiryMail(query);
                console.log(sendmail)
            }
            
        })
    },
    render:_=>{
        return`<div id="Contact-page">
        <div id="contact-us">
            <p>Reach Out to Us.</p>
            <form id="my-form" method="post">
                <input type="text" id="contact-name" name="Name" placeholder="Full Name" minlength="3" required/>
                <input type="email" id="contact-mail" name="E-Mail" placeholder="E-mail" required/>
                <input type="tel" id="contact-phone-number" name="Ph. No. :" placeholder="Phone Number" required/>
                <input type="text" id="Contact-Subject"name="subject" placeholder="Subject" minlength="3" required/>
                <textarea type="text" id="contact-message" name="message" placeholder="Message" minlength="10"required></textarea>
                <button type="submit" id="my-form-button">Send </button>            
                <p id="my-form-status"></p>
            </form>
            <p> or  </p>    
            <div id="icons">
            <a href="https://api.whatsapp.com/send/?phone=918800198964&text&app_absent=0">
                <img src="../images/logo/whatsapp.svg"  />
            </a>&ensp;&ensp;
            <a href="tel:+918168644824">
                <img src="../images/logo/call.svg"  />
            </a>&ensp;&ensp;
            <a href="https://www.google.com/maps/place/StarShine+Cricket+Ground/@28.3836783,77.0822042,17.04z/data=!4m5!3m4!1s0x0:0xe27c325cd61928ac!8m2!3d28.383492!4d77.0837003" target="_blank">
                <img src="../images/logo/location.svg" />
            </a>
            </div>
            </div>
        <div id="map-div">
        <a href="https://www.google.com/maps/place/StarShine+Cricket+Ground/@28.3836783,77.0822042,17.04z/data=!4m5!3m4!1s0x0:0xe27c325cd61928ac!8m2!3d28.383492!4d77.0837003" target="_blank">
        <img src="../images/map.jpg" /></a></div>
    </div>
    <br>
    <br>
        `
    }
}

export default ContactUsScreen