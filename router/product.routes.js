const {Router} = require("express")
const { getAllProducts, getOneProducts, addProduct, updateProduct, deleteProducts } = require("../controller/product.controller")
const authorization = require("../middleware/authorization")

const productRouter = Router()

productRouter.get("/get_all_products", getAllProducts)
productRouter.get("/get_one_product/:id", getOneProducts)
productRouter.post("/add_product", authorization, addProduct)
productRouter.patch("/update_product/:id", authorization, updateProduct)
productRouter.delete("/delete_product/:id", authorization, deleteProducts)

module.exports = productRouter