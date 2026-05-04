const { Router } = require("express");
const { getAllCars, getOneCar, addCar, updateCar, deleteCar } = require("../controller/car.controller");
const authorization = require("../middleware/authorization");

const carRouter = Router();

carRouter.get("/all", getAllCars);
carRouter.get("/:id", getOneCar); // ID parametr qo'shildi
carRouter.post("/add", authorization, addCar);
carRouter.patch("/update/:id", authorization, updateCar); // ID parametr qo'shildi
carRouter.delete("/delete/:id", authorization, deleteCar); // ID parametr qo'shildi

module.exports = carRouter;
