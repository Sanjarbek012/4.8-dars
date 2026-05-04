require('dotenv').config();
const express = require("express");
const cors = require("cors");

const authRouter = require("./router/auth.routes");
const carRouter = require("./router/car.routes");
const productRouter = require("./router/product.routes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routerlarni ulash (Prefix bilan)
app.use("/auth", authRouter);
app.use("/cars", carRouter);
app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});

