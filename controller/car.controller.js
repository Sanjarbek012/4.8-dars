const { read_file, write_file } = require("../fs/file-manager");
const { v4 } = require("uuid");

const getAllCars = async (req, res) => {
  const cars = read_file("cars.json") || [];
  res.status(200).json(cars);
};

const addCar = async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) return res.status(400).json({ message: "Ma'lumot to'liq emas" });

  const cars = read_file("cars.json") || [];
  const newCar = { id: v4(), name, price };
  cars.push(newCar);
  write_file("cars.json", cars);
  res.status(201).json({ message: "Mashina qo'shildi", car: newCar });
};

const getOneCar = async (req, res) => {
  const { id } = req.params;
  const cars = read_file("cars.json") || [];
  const car = cars.find(c => c.id === id);
  if (!car) return res.status(404).json({ message: "Mashina topilmadi" });
  res.status(200).json(car);
};

const updateCar = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  let cars = read_file("cars.json") || [];
  const index = cars.findIndex(c => c.id === id);

  if (index === -1) return res.status(404).json({ message: "Topilmadi" });

  cars[index] = { ...cars[index], name: name || cars[index].name, price: price || cars[index].price };
  write_file("cars.json", cars);
  res.status(200).json({ message: "Yangilandi" });
};

const deleteCar = async (req, res) => {
  const { id } = req.params;
  let cars = read_file("cars.json") || [];
  const filtered = cars.filter(c => c.id !== id);
  
  if (cars.length === filtered.length) return res.status(404).json({ message: "Topilmadi" });

  write_file("cars.json", filtered);
  res.status(200).json({ message: "O'chirildi" });
};

module.exports = { getAllCars, addCar, getOneCar, updateCar, deleteCar };
