import {
  HideLoading,
  parseRequestUrl,
  ShowLoading,
  showMessage,
} from "../util.js";
import { getProduct, updateProduct } from "../api.js";
import { getUserInfo } from "../localStorage.js";

const ProductEditScreen = {
  after_render: (_) => {
    const request = parseRequestUrl();
    document.getElementById("discount").addEventListener("keyup", () => {
      const price = document.getElementById("price").value;
      const discount = document.getElementById("discount");
      const populateprice = document.getElementById("discountedprice");
      const discountPrice = price - (price * discount.value) / 100;
      populateprice.innerText = parseInt(discountPrice);
      console.log(populateprice.innerText);
    });

    document
      .getElementById("edit-product-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        ShowLoading();
        const product = {
          _id: request.id,
          name: document.getElementById("name").value,
          description: document.getElementById("description").value,
          stock: document.getElementById("stock").value,
          price: document.getElementById("price").value,
          discountPrice: parseInt(
            document.getElementById("discountedprice").innerText
          ),
          image: document.getElementById("image").value,
          image2: document.getElementById("image2").value,
          image3: document.getElementById("image3").value,
          image4: document.getElementById("image4").value,
          brand: document.getElementById("brand").value,
          category: document.getElementById("category").value,
        };
        const data = await updateProduct(product);
        HideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          document.location.hash = "/productlist";
        }
      });
  },
  render: async (_) => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    const { isAdmin } = getUserInfo();
    if (!isAdmin) {
      document.location.hash = "/shop";
    }
    return `
        <div class="edit-product-form">
            <div>
            <a href="#/productlist">Back to products</a>
            </div>
            <div class="product-form-container">
                <form id="edit-product-form">
                    <ul class="product-form-items">
                        <li><h1>Edit product #${product._id.substring(
                          0,
                          8
                        )}</h1></li>
                        <hr><br>
                        <li>
                        <label for="name">Name</label>
                        <input type="text" name="name" value="${
                          product.name
                        }" id="name"/>
                        </li>
                        <li>
                        <label for="description">Product Description</label>
                        <textarea type="text" name="description" id="description" >${
                          product.description
                        }</textarea>
                        </li>
                        <li>
                        <label for="stock">Stock</label>
                        <input type="number" name="stock" value="${
                          product.stock
                        }" id="stock" />
                        </li>
                        <li>
                        <label for="price">Price</label>
                        <input type="number" name="price" value="${
                          product.price
                        }" id="price"/>
                        </li>
                        <li style="flex-direction:column; width:100%">
                        <strong>Discount(in percentage):</strong>
                        <input style="width:100%" type="number" name="price" value="${
                          100 - (product.discountPrice / product.price) * 100
                        }" id="discount"/>
                        <p style="text-align:center;">Price After Discount :₹<span id="discountedprice">${
                          product.discountPrice
                        }</span></p>
                        </li>
                        <li>
                        </li>
                        <li>
                        <label for="brand">brand</label>
                        <input type="text" name="brand" value="${
                          product.brand
                        }" id="brand" />
                        </li>
                        <li>
                        <label for="image">Cover Image</label>
                        <input type="text" name="productImage" value="${
                          product.image
                        }" id="image" />
                        </li>
                        <li>
                        <label for="image2">Image 2</label>
                        <input type="text" name="productImage" value="${
                          product.image2
                        }" id="image2" />
                        </li>
                        <li>
                        <label for="image3">Image 3</label>
                        <input type="text" name="productImage" value="${
                          product.image3
                        }" id="image3" />
                        </li>
                        <li>
                        <label for="image4">Image 4</label>
                        <input type="text" name="productImage" value="${
                          product.image4
                        }" id="image4" />
                        </li>
                        <li>
                        <label for="category">Category</label>
                        <input type="text" name="category" value="${
                          product.category
                        }" id="category"/>
                        </li>
                        <br>
                        <li style="display:flex;justify-content:center;">
                        <button type="submit" id="create-update-product-btn">Update Product</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        `;
  },
};

export default ProductEditScreen;
