import { createReview, getProduct } from "../api.js";
import {
  HideLoading,
  parseRequestUrl,
  rerender,
  ShowLoading,
  showMessage,
} from "../util.js";
import Rating from "../component/Rating.js";
import { getUserInfo, setsize } from "../localStorage.js";

const scrolltop = (_) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
const ProductScreen = {
  after_render: (_) => {
    const request = parseRequestUrl();
    document.getElementById("add-button").addEventListener("click", (_) => {
      if (document.getElementById("size")) {
        const productsize =
          document.getElementById("size").selectedOptions[0].value;
        if (productsize == "Select Size") {
          showMessage("Size not Selected");
        } else {
          setsize(productsize);
          document.location.hash = `/cart/${request.id}`;
        }
      } else {
        document.location.hash = `/cart/${request.id}`;
      }
    });

    document.getElementById("image").addEventListener("click", (_) => {
      document.getElementById("product-img").src =
        document.getElementById("image").src;
    });
    document.getElementById("image2").addEventListener("click", (_) => {
      document.getElementById("product-img").src =
        document.getElementById("image2").src;
    });
    document.getElementById("image3").addEventListener("click", (_) => {
      document.getElementById("product-img").src =
        document.getElementById("image3").src;
    });
    document.getElementById("image4").addEventListener("click", (_) => {
      document.getElementById("product-img").src =
        document.getElementById("image4").src;
    });
    // zoom image
    document.getElementById("product-img").addEventListener("click", () => {
      document.getElementById("zoomImage").style.display = "flex";
      document.getElementById("fullscreenImage").src =
        document.getElementById("product-img").src;
    });
    document.getElementById("close").addEventListener("click", () => {
      document.getElementById("zoomImage").style.display = "none";
    });
    document.getElementById("zimage").addEventListener("click", (_) => {
      document.getElementById("fullscreenImage").src =
        document.getElementById("image").src;
    });
    document.getElementById("zimage2").addEventListener("click", (_) => {
      document.getElementById("fullscreenImage").src =
        document.getElementById("image2").src;
    });
    document.getElementById("zimage3").addEventListener("click", (_) => {
      document.getElementById("fullscreenImage").src =
        document.getElementById("image3").src;
    });
    document.getElementById("zimage4").addEventListener("click", (_) => {
      document.getElementById("fullscreenImage").src =
        document.getElementById("image4").src;
    });
    // ************************************************ //
    if (document.getElementById("review-form")) {
      document
        .getElementById("review-form")
        .addEventListener("submit", async (e) => {
          e.preventDefault();
          const request = parseRequestUrl();
          ShowLoading();
          console.log(request.id);
          const data = await createReview(request.id, {
            comment: document.getElementById("comment").value,
            rating: document.getElementById("rating").value,
          });
          HideLoading();
          if (data.error) {
            showMessage(data.error);
          } else {
            showMessage("Review Added Successfully", () => {
              rerender(ProductScreen);
            });
          }
        });
    }
  },
  render: async (_) => {
    const request = parseRequestUrl();
    ShowLoading();
    const product = await getProduct(request.id);
    HideLoading();
    scrolltop();
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    const userinfo = getUserInfo();
    return `

        <div class="back-to-result">
            <a href='/#/shop'>Back to results</a>
        </div>
        <div class='content'>
            <div class="image-sidebar">
            <img src="${product.image}" alt="${product.name}" id="image">
            <img src="${product.image2}" alt="${product.name}" id="image2">
            <img src="${product.image3}" alt="${product.name}" id="image3">
            <img src="${product.image4}" alt="${product.name}" id="image4">
            </div>
            <div class="details">
                <div class="detail-img">
                <img src="${product.image}" alt="${
      product.name
    }" id="product-img"/>
                </div>
                <div id="zoomImage">
                <div id="closezoom"><span id="close">X</span></div>
                <img src="" alt="" id="fullscreenImage"/>
                <p></p>
                <div class="image-bottombar">
            <img src="${product.image}" alt="${product.name}" id="zimage">
            <img src="${product.image2}" alt="${product.name}" id="zimage2">
            <img src="${product.image3}" alt="${product.name}" id="zimage3">
            <img src="${product.image4}" alt="${product.name}" id="zimage4">
            </div>
                </div>
                <div class="details-info">
                    <ul>
                        <li>
                            <h3>${product.name}</h3>
                        </li>
                        <li>
                            ${
                              product.rating === 0
                                ? `${Rating.render({
                                    value: "0",
                                    text: `${product.reviews.length} reviews`,
                                  })}`
                                : ``
                            }
                            ${Rating.render({
                              value: product.rating,
                              text: `${product.reviews.length} reviews`,
                            })} 
                        </li>
                        <li>
                            Price : <strong class="MrpTag">₹ ${
                              product.price
                            }</strong>
                            ${parseInt(
                              100 -
                                (product.discountPrice / product.price) * 100
                            )}% Discount<br>
                            <strong> ₹ ${
                              product.discountPrice ? product.discountPrice : ``
                            }</strong>
                        </li>
                        ${
                          product.category === "Cricket bat"
                            ? `<li>
                            <select value="size" id="size">
                                <option name="" disabled selected>Select Size</option>
                                <option name="SH(FULL)">SH(FULL)</option>
                                <option name="Harrow">Harrow</option>
                                <option name="6">6</option>
                                <option name="5">5</option>
                                <option name="4">4</option>
                                <option name="3">3</option>
                            </select>
                        </li>`
                            : ``
                        }
                        ${
                          product.name.includes("Thigh Pad")
                            ? `<li>
                            <select value="size" id="size">
                                <option name="" disabled selected>Select Size</option>
                                <option name="SH(FULL)">Adult Left Thigh</option>
                                <option name="Harrow">Adult Right Thigh</option>
                                <option name="SH(FULL)">Junior Left Thigh</option>
                                <option name="Harrow">Junior Right Thigh</option>
                            </select>
                        </li>`
                            : ``
                        }
                        ${
                          product.name.includes("RSLA ThighPads")
                            ? `<li>
                            <select value="size" id="size">
                                <option name="" disabled selected>Select Size</option>
                                <option name="Adult Black">Adult Black</option>
                                <option name="Junior Black">Junior Black</option>
                                <option name="Adult Blue">Adult Blue</option>
                                <option name="Junior Blue">Junior Blue</option>
                            </select>
                        </li>`
                            : ``
                        }
                        <li>
                            Description:
                            <div>
                                ${product.description}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="detail-action">
                <ul>
                    <li>
                        Price: ₹ ${
                          product.discountPrice
                            ? product.discountPrice
                            : product.price
                        }
                    </li>
                    <li>
                        Status: ${
                          product.stock > 0
                            ? `<span class="sucess">Available</span> `
                            : `<span class="error"> Out of Stock </span>`
                        }
                    </li>
                    <li class="btn-li">
                        <div> <button id='add-button' class='${
                          product.stock == 0 ? `hidden-btn` : `primary`
                        }'>Add to cart</button> </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="review-container-parent">
        <h1>Reviews</h1><hr>
        ${product.reviews.length === 0 ? `<h2>No Reviews Found</h2>` : ``}
        <ul class="review">
        ${product.reviews
          .map(
            (review) => `
        <li>
            <div><b>${review.name}</b></div>
            <div class="rating-container">
                ${Rating.render({ value: review.rating })}
            </div>
            <div>
                ${review.comment}
            </div>
            <div>
            ${review.createdAt.substring(0, 10)}
            </div>
        </li>
        `
          )
          .join("\n")}
        <li class="writeReview">
        <h2>Write A review</h2>
        ${
          userinfo.name
            ? `
            <form id="review-form">
            <ul class="review-form-container">
            <li>
            <select required name="rating" id="rating">
            <option value="">Rating</option>
            <option value="1">1 = Poor</option>
            <option value="2">2 = fair</option>
            <option value="3">3 = average</option>
            <option value="4">4 = Very good</option>
            <option value="5">5 = Excelent</option>
            </select>
            </li>
            <li>
            <textarea required id="comment" type="text" placeholder="Review" ></textarea>
            </li>
            <li>
            <button type="Submit" >Submit</button>
            </li>
            </ul>
            </form
        `
            : `<div>Login to write a review</div>`
        }
        </li>
        </ul>
        </div>
        `;
  },
};

export default ProductScreen;
