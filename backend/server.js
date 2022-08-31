import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import userRouter from "./router/userRouter.js";
import bodyParser from "body-parser";
import orderRouter from "./router/orderRouter.js";
import productRouter from "./router/productRouter.js";
import UploadRouter from "./router/UploadRouter.js";
import path from "path";
import queryRouter from "./router/queryRouter";
import mailRouter from "./router/MailRouter";
import razorpayrouter from "./router/RazorpayRouter";

const app = express();

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log(error.reason);
  });

app.use(cors());
app.use(bodyParser.json());
app.use("/api/uploads", UploadRouter);
app.use("/api/users", userRouter);
app.use("/api/query", queryRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/sendordermail", mailRouter);
app.use("/api/razorpay", razorpayrouter);
app.use(express.static(path.join(__dirname, "/../frontend")));
app.get("*", (req, res) => {
  res.sendFile(__dirname, "/../frontend/index.html");
});

app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message });
});
const port = config.PORT;
app.listen(port, (_) => {
  console.log("serve at " + config.PORT);
});
