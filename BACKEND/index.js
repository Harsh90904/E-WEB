const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/db");
const { userRouter } = require("./routers/user.route");
const path = require("path");
const productrouter = require("./routers/product.router");
const { CommentRouter } = require("./routers/comment.router");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/productImage", express.static(path.join(__dirname, "productImage")));
app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello node js" });
});
app.use("/user",userRouter)
app.use("/products", productrouter);
app.use("/comment", CommentRouter );
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log("listening on port ", PORT);
  connectDb();
});
