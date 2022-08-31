import { getProduct } from "../api.js";
import {
  getCartItems,
  getsize,
  removesize,
  setCartItems,
} from "../localStorage.js";
import { parseRequestUrl, rerender } from "../util.js";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    }
  } else {
    cartItems = [...cartItems, item];
    removesize();
  }
  setCartItems(cartItems);
  removesize();
  if (forceUpdate) {
    rerender(CartScreen);
  }
};

const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = "/cart/";
  } else {
    rerender(CartScreen);
  }
};

const CartScreen = {
  after_render: (_) => {
    const qtyselects = document.getElementsByClassName("qty-select");
    Array.from(qtyselects).forEach((qtyselect) => {
      qtyselect.addEventListener("change", (e) => {
        const item = getCartItems().find((x) => x.product === qtyselect.id);
        addToCart({ ...item, qty: Number(e.target.value) }, true);
      });
    });
    const deleteButtons = document.getElementsByClassName("delete-btn");
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        removeFromCart(deleteButton.id);
      });
    });
    document.getElementById("checkout-btn").addEventListener("click", (_) => {
      document.location.hash = "/signin";
    });
  },
  render: async (_) => {
    const size = getsize();
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.discountPrice,
        stock: product.stock,
        size: size.size,
        qty: 1,
      });
    }
    console.log(request);

    const cartItems = getCartItems();
    return `
        <div class="cart">
        <div class="cart-list">
            <ul class="cart-list-container">
                <li>
                    <h3>Shopping Cart</h3>
                    <div></div>
                    <div>Price </div>    
                </li>
                ${
                  cartItems.length === 0
                    ? `<div id="empty-cart"> Cart is Empty. <a href="#/shop">Shop Now</a> </div>`
                    : cartItems
                        .map(
                          (item) => `
                    <li>
                        <div class="cart-image">
                        <img src="${item.image}" alt="${item.name}" />
                        </div>
                        <div class="cart-name">
                            <div>
                                <a href="/#/product/${item.product}" >
                                    ${item.name}
                                </a>
                            </div>
                            <div>
                            ${
                              item.size
                                ? `
                                        <div>Size:&ensp;${item.size}</div>
                                        `
                                : ``
                            }
                            </div>
                            <div>
                                Qty:<select class="qty-select" id="${
                                  item.product
                                }">
                                ${[...Array(parseInt(item.stock)).keys()].map(
                                  (x) =>
                                    item.qty === x + 1
                                      ? `<option selected value="${x + 1}">${
                                          x + 1
                                        }</option>`
                                      : `<option value="${x + 1}">${
                                          x + 1
                                        }</option>`
                                )}
                                </select>
                                <button type="button" class="delete-btn" id="${
                                  item.product
                                }">Delete</button>
                            </div>
                            
                        </div>
                        <div class="cart-price">
                            ₹${item.price}
                        </div>
                    </li>
                    `
                        )
                        .join("\n")
                }
            </ul>
        </div>
        <div class="cart-action">
            <h3>Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)}items)
            : ₹${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
            <button id="checkout-btn" class="primary">Proceed to checkout</button>    
        </div>
        `;
  },
};

export default CartScreen;
