import express from "express";
import cors from "cors";
import morgan from "morgan";
import { cacheClient } from "./cache/cacheDBInit";
import userRouter from "./routes/userRoute";
import productRouter from "./routes/productRoute";
import categoryRouter from "./routes/categoryRoute";
import cartRouter from "./routes/cartRoute";
import profileRouter from "./routes/profileRoute";
import orderRouter from "./routes/orderRoute";
import paymentRouter from "./routes/paymentRoute";

const port = 3000;

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/payment", paymentRouter);

app.listen(port, async () => {
  try {
    await cacheClient.connect();
    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
