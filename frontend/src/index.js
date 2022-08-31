import HomeScreen from "./screens/HomeScreen.js";
import {
  HideLoading,
  parseRequestUrl,
  ShowLoading,
  showMessage,
} from "./util.js";
import Error404screen from "./screens/Error404screen.js";
import CartScreen from "./screens/CartScreen.js";
import signinScreen from "./screens/SigninScreen.js";
import Header from "./component/Header.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import PlaceorderScreen from "./screens/PlaceorderScreen.js";
import orderScreen from "./screens/orderScreen.js";
import dashboardScreen from "./screens/DashboardScreen.js";
import ProductlistScreen from "./screens/productlistScreen.js";
import ProductEditScreen from "./screens/ProductEditScreen.js";
import IndexScreen from "./screens/IndexScreen.js";
import ContactUsScreen from "./screens/ContactUsScreen.js";
import OrderListScreen from "./screens/OrderListScreen.js";
import queryListScreen from "./screens/queryScreen.js";
import WebpageSelectScreen from "./screens/WebsiteChoseScreen.js";
import ReturnAndReplacement from "./screens/ReturnAndReplacement.js";
import ProductScreen from "./screens/ProductScreen.js";

const routes = {
  "/": WebpageSelectScreen,
  "/ground": IndexScreen,
  "/shop": HomeScreen,
  "/product/:id/edit": ProductEditScreen,
  "/product/:id": ProductScreen,
  "/order/:id": orderScreen,
  "/cart/:id": CartScreen,
  "/cart": CartScreen,
  "/signin": signinScreen,
  "/register": RegisterScreen,
  "/profile": ProfileScreen,
  "/shipping": ShippingScreen,
  "/payment": PaymentScreen,
  "/placeorder": PlaceorderScreen,
  "/dashboard": dashboardScreen,
  "/productlist": ProductlistScreen,
  "/contactus": ContactUsScreen,
  "/orderlist": OrderListScreen,
  "/queries": queryListScreen,
  "/termsconditions": ReturnAndReplacement,
};

const router = async (_) => {
  ShowLoading();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? `/:id` : "") +
    (request.verb ? `/${request.verb}` : "");
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404screen;
  const header = document.getElementById("header-container");
  header.innerHTML = await Header.render();
  await Header.after_render();
  const main = document.getElementById("main-container");
  main.innerHTML = await screen.render();
  if (screen.after_render) {
    await screen.after_render();
  }
  HideLoading();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
