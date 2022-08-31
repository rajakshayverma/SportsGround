import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel";
import { isAuth, isAdmin } from "../utils";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const searchKeyword = req.query.searchKeyword
      ? {
          category: {
            $regex: req.query.searchKeyword,
            $options: "i",
          },
        }
      : {};
    const products = await Product.find({ ...searchKeyword });
    console.log(products);
    res.send(products);
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
  })
);

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "sample",
      description: "sample",
      category: "sample",
      brand: "ZAP",
      image: "Image address here",
      image2: "Image address here",
      image3: "Image address here",
      image4: "Image address here",
    });
    const createdProduct = await product.save();
    if (createdProduct) {
      res
        .status(201)
        .send({ messgae: "product created", product: createdProduct });
    } else {
      res.status(500).send({ messgae: "error in Creating Product" });
    }
  })
);

productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.description = req.body.description;
      product.stock = req.body.stock;
      product.price = req.body.price;
      product.discountPrice = req.body.discountPrice;
      product.image = req.body.image;
      product.image2 = req.body.image2;
      product.image3 = req.body.image3;
      product.image4 = req.body.image4;
      product.brand = req.body.brand;
      product.category = req.body.category;
      const updateProduct = await product.save();
      if (updateProduct) {
        res.send({ messgae: "Product Updated", product: updateProduct });
      } else {
        res.status(500).send({ error: "Error in Updating" });
      }
    } else {
      res.status(404).send({ error: "Product Not Found" });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deletedproduct = await product.remove();
      res.send({
        message: "Product deleted sucessfuly",
        product: deletedproduct,
      });
    } else {
      res.status(404).send({ message: "product not found" });
    }
  })
);

productRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const review = {
        rating: req.body.rating,
        comment: req.body.comment,
        user: req.user._id,
        name: req.user.name,
      };
      product.reviews.push(review);
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      product.numReviews = product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: "Comment Created.",
        data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      throw Error("Product does not exist.");
    }
  })
);
export default productRouter;
