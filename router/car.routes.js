const { Router } = require("express");
const { getAllCars, getOneCar, addCar, updateCar, deleteCar } = require("../controller/car.controller");
const authorization = require("../middleware/authorization");

const carRouter = Router();

carRouter.get("/all", getAllCars);
carRouter.get("/:id", getOneCar); 
carRouter.post("/add", authorization, addCar);
carRouter.patch("/update/:id", authorization, updateCar); 
carRouter.delete("/delete/:id", authorization, deleteCar);

module.exports = carRouter;
