import { createProduct, getProducts, deleteProduct } from "../api.js";
import DashboardMenu from "../component/DashboardMenu.js";
import { getUserInfo } from "../localStorage.js";
import { HideLoading, rerender, ShowLoading, showMessage } from "../util.js";

const ProductlistScreen = {
  after_render: (_) => {
    document
      .getElementById("create-new-product")
      .addEventListener("click", async (_) => {
        const data = await createProduct();
        document.location.hash = `/product/${data.product._id}/edit`;
      });
    let edit_btn = document.getElementsByClassName("edit-product-btn");
    edit_btn = Array.from(edit_btn).forEach((editbutton) => {
      editbutton.addEventListener("click", (_) => {
        document.location.hash = `/product/${editbutton.id}/edit`;
      });
    });
    let delete_btn = document.getElementsByClassName("delete-product-btn");
    delete_btn = Array.from(delete_btn).forEach((deletebutton) => {
      deletebutton.addEventListener("click", async (_) => {
        if (confirm("Are You Sure to Delete this product ?")) {
          ShowLoading();
          const data = await deleteProduct(deletebutton.id);
          if (data.error) {
            showMessage(data.error);
          } else {
            rerender(ProductlistScreen);
          }
          HideLoading();
        }
      });
    });
  },
  render: async (_) => {
    const prodcuts = await getProducts({});
    const { isAdmin } = getUserInfo();
    if (!isAdmin) {
      document.location.hash = "/shop";
    }
    return `
        <div class="dashboard">
        ${DashboardMenu.render({ selected: "products" })}
        <div class="dashboard-content">
        <h1>Products</h1>
        <button id="create-new-product">Create New Product</button>
        <p class="mobileadmin"><br>
        <br>
        <br>Open in Laptop to view content</p>
        <div class="product-list" id="productsmobile">
            <table>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                ${prodcuts
                  .map(
                    (product, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${product._id}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.category}</td>
                        <td>${product.brand}</td>
                        <td>
                        <button id=${
                          product._id
                        } class="edit-product-btn">Edit</button>
                        <button id=${
                          product._id
                        } class="delete-product-btn">Delete</button>
                        </td>
                    </tr>
                `
                  )
                  .join("\n")}
                </tbody>
            </table>
        </div>
    </div>
    </div>
        `;
  },
};

export default ProductlistScreen;
