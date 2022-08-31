import { getProducts } from "../api.js";
import Rating from "../component/Rating.js";
import { parseRequestUrl } from "../util.js";
const scrolltop = (_) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
const HomeScreen = {
  after_render: (_) => {
    const bats = document.getElementById("category1");
    bats.addEventListener("click", (_) => {
      document.location.hash = `/shop/?q=${bats.innerText}`;
    });
    const ball = document.getElementById("Category2");
    ball.addEventListener("click", (_) => {
      document.location.hash = `/shop/?q=${ball.innerText}`;
    });
    const bat = document.getElementById("Category3");
    bat.addEventListener("click", (_) => {
      document.location.hash = `/shop/?q=${bat.innerText}`;
    });
    const kit = document.getElementById("Category4");
    kit.addEventListener("click", (_) => {
      document.location.hash = `/shop/?q=${kit.innerText}`;
    });
    document.getElementById("Category5").addEventListener("click", () => {
      document.location.hash = `/shop`;
    });
    const others = document.getElementById("Category6");
    others.addEventListener("click", () => {
      document.location.hash = `/shop/?q=${others.innerText}`;
    });
  },
  render: async (_) => {
    const { value } = parseRequestUrl();
    scrolltop();
    const products = await getProducts({ searchKeyword: value });
    if (products.error) {
      return `<div class="error">${err.message}`;
    }
    return `
        <div class="shop-banner">
            <div class="black-layer center">
                <span> Cricket Shop</span>
            </div>
        </div>
        <div id="shop">
        <div class="category">
            <div>
                <p style="font-size:2.5rem; font-weight:bold;"> Categories <span> </span></p>
                <hr>
                <p id="Category5">All Products</p>
                <p id="category1">Cricket Bat</p>
                <p id="Category2">Cricket ball</p>
                <p id="Category3">Batting protection</p>
                <p id="Category4">Kit Bag</p>
                <p id="Category6">Others</p>
            </div>
        </div>
        <div style="min-width: 80%;">
            <ul class="products">
            ${products
              .map(
                (product) => `
                <li>
                    <div class="product">
                        <a href="#/product/${product._id}">
                            <img src="${product.image}" alt="${product.name}" />
                        </a>
                        <div class="product-name">
                            <a href="#/product/${product._id}">${
                  product.name
                }</a>
                        </div>
                        <div class="product-rating">    
                        ${Rating.render({
                          value: product.rating,
                          text: product.reviews.length + "reviews",
                        })}
                        </div>
                        <div class="product-brand">
                        ${product.brand}
                        </div>
                        <div class="product-price"><span class="MrpTag">₹ ${
                          product.price
                        }</span><strong>
                        ₹ ${product.discountPrice}</strong>
                        </div>
                    </div>
                </li>
            `
              )
              .join("\n")}
            </ul>
        </div>
        </div>
        `;
  },
};

export default HomeScreen;
