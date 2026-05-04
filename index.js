const express = require("express");
const cors = require("cors")
require('dotenv').config()
const authRouter  = require("./router/auth.routes");
const productRouter = require("./router/product.routes");
const carRouter = require("./router/car.routes")

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())

// Router
app.use("/auth", authRouter);
app.use(productRouter)
app.use(carRouter)

app.listen(PORT, () => {
  console.log("Server is running at: http://localhost:" + PORT);
  
});