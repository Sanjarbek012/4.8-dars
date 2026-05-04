const { read_file, write_file } = require("../fs/file-manager");
const { v4 } = require("uuid");

const getAllCars = async (req, res) => {
  const cars = read_file("cars.json");
  res.status(200).json(cars);
};

// POST
const addCar = async (req, res) => {
  const { name, price } = req.body;

  const cars = read_file("cars.json");

  cars.push({
    id: v4(),
    name,
    price,
  });

  write_file("cars.json", cars);

  res.status(201).json({
    message: "Added new car",
  });
};

// GET ONE
const getOneCar = async (req, res) => {
  const { id } = req.params;

  const cars = read_file("cars.json");

  const foundedCar = cars.find((item) => item.id === id);

  if (!foundedCar) {
    return res.status(404).json({
      message: "Car not found",
    });
  }
  res.status(200).json(foundedCar);
};

// PATCH
const updateCar = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const cars = read_file("cars.json");

  const foundedCar = cars.find((item) => item.id === id);

  if (!foundedCar) {
    return res.status(404).json({
      message: "Car not found",
    });
  }

  cars.forEach((item) => {
    if (item.id === id) {
      item.name = name ? name : item.name;
      item.price = price ? price : item.price;
    }
  });
  write_file("cars.json", cars);

  res.status(200).json({
    message: "Car updated",
  });
};

// DELETE
const deleteCar = async (req, res) => {
  const { id } = req.params;
  const cars = read_file("cars.json");

  const foundedCar = cars.find((item) => item.id === id);

  if (!foundedCar) {
    return res.status(404).json({
      message: "Car not found",
    });
  }

  cars.forEach((item, idx) => {
    if (item.id === id) {
      cars.splice(idx, 1);
    }
  });
  write_file("cars.json", cars);
  res.status(200).json({
    message: "Car deleted",
  });
};


module.exports = {
  getAllCars,
  addCar,
  getOneCar,
  updateCar,
  deleteCar,
}