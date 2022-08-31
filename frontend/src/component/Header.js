import { clearUser, getUserInfo } from "../localStorage.js";

const Header = {
  render: (_) => {
    const { name, isAdmin } = getUserInfo();
    return `
    <a href="/#"><img src="./images/logo/logo.png" /></a>
    <nav class="navbar navbar-expand-lg navbar-dark">
  <a class="navbar-brand" href="#">Home</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#/shop">Shop</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#/ground">Ground</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#/contactus">Contact Us</a>
      </li>
      <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${name ? name : "User"}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                <a class="dropdown-item text-dark" href=${
                  isAdmin ? "#/dashboard" : name ? "#/profile" : "#/signin"
                }>
                ${isAdmin ? "Dashboard" : name ? "Orders" : "Sign In"}</a>
                </li>
                ${
                  isAdmin
                    ? `
                    <li>
                    <a class="dropdown-item text-dark" href="#/profile">Change Password</a>
                    </li>
                    `
                    : ""
                }
                ${
                  name
                    ? `
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-dark" href="#" id="signout-btn">Signout</a></li>                    `
                    : ``
                }
            </ul>
        </li>
    </ul>
  </div>
</nav>
        `;
  },
  after_render: (_) => {
    const { name } = getUserInfo();
    if (name) {
      document.getElementById("signout-btn").addEventListener("click", (_) => {
        document.location.hash = "/";
        clearUser();
        document.location.hash = "/";
      });
    }
  },
};

export default Header;
/*
<div id="nav-bar">
    <a href="#/" id="ground-head"}>Home </a>
    <a href="#/ground" id="ground-head"}>Ground </a>
    <a href="#/shop">Shop</a>
    ${name ? `` : `<a href="#/contactus">Contact us</a>`}
    ${
      name
        ? `<a href="#/profile">${name}</a>`
        : `<a href="#/signin"><button class="login-btn">Login</button></a>`
    }
    ${
      name
        ? `<a id='signout-btn'><button class="login-btn">Logout</button></a>`
        : ``
    }
    ${isAdmin ? `<a href="/#/dashboard">DashBoard</a>` : ``}
</div>
*/
/*
    <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid " id="NavbarItems">
            <a class="navbar-brand nav-items" href="#">Home  |</a>
            <li class="nav-brand">
            <a class="nav-link active" aria-current="page" href="#/shop">Shop  |</a>
            </li>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <li class="nav-item">
                <a class="nav-link" href="#/ground">Ground  |</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#/contactus">Contact Us  |</a>
                </li>
                
            </div>
        </div>
    </nav>
    */
