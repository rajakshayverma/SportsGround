import { getUserInfo, getShipping, setShipping } from "../localStorage.js";
import CheckoutSteps from "../component/CheckoutSteps.js";

const ShippingScreen = {
  after_render: (_) => {
    document
      .getElementById("shopping-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        setShipping({
          contactnumber: document.getElementById("contactnumber").value,
          city: document.getElementById("city").value,
          address: document.getElementById("address").value,
          postalcode: document.getElementById("postalcode").value,
          country: document.getElementById("country").value,
        });
        document.location.hash = "/payment";
      });
  },
  render: (_) => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }
    const { contactnumber, address, city, postalcode, country } = getShipping();
    return `
        ${CheckoutSteps.render({ step1: true, step2: true })}
        <div id="shopping-profile">
            <form id="shopping-form">
                <ul class="shopping-form-items">
                <li id="Shipping-text">
                    <h1>Shipping Details</h1>
                </li>
                <li>
                    <input type="number" value="${contactnumber}" required  name="contactnumber" id="contactnumber" placeholder="Contact Number" maxlength=10 minlength=10 />
                </li>
                <li>
                    <input value="${address}" required type="text" name="address" id="address" placeholder="Address"  />
                </li>
                <li>
                    <input value="${city}" required type="text" name="city" id="city" placeholder="City"  />
                </li>
                <li>
                    <input value="${postalcode}" required type="number" name="postalcode" placeholder="Postal code" id="postalcode"  />
                </li>
                <li>
                    <input value="India" required type="text" name="country" placeholder="Country" id="country" disabled />
                </li>
                <li id="continue-btn-container">
                    <button type="submit" id="conitnue-btn">Continue</button>
                </li>
                </ul>
            </form>
        </div>
        `;
  },
};

export default ShippingScreen;
