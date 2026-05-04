const { read_file, write_file } = require("../fs/file-manager");
const { v4 } = require("uuid");

const getAllProducts = async (req, res) => {
  const products = read_file("products.json");
  res.status(200).json(products);
};

// POST
const addProduct = async (req, res) => {
  const { title, quantity } = req.body;

  const products = read_file("products.json");

  products.push({
    id: v4(),
    title,
    quantity,
  });

  write_file("products.json", products);

  res.status(201).json({
    message: "Added new product",
  });
};

// GET ONE
const getOneProducts = async (req, res) => {
  const { id } = req.params;

  const products = read_file("products.json");

  const foundedProduct = products.find((item) => item.id === id);

  if (!foundedProduct) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  res.status(200).json(foundedProduct);
};

// PATCH
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, quantity } = req.body;
  const products = read_file("products.json");

  const foundedProduct = products.find((item) => item.id === id);

  if (!foundedProduct) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  products.forEach((item) => {
    if (item.id === id) {
      item.title = title ? title : item.title;
      item.quantity = quantity ? quantity : item.quantity;
    }
  });
  write_file("products.json", products);

  res.status(200).json({
    message: "Product updated",
  });
};

// DELETE
const deleteProducts = async (req, res) => {
  const { id } = req.params;
  const products = read_file("products.json");

  const foundedProduct = products.find((item) => item.id === id);

  if (!foundedProduct) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  products.forEach((item, idx) => {
    if (item.id === id) {
      products.splice(idx, 1);
    }
  });
  write_file("products.json", products);
  res.status(200).json({
    message: "Product deleted",
  });
};


module.exports = {
  getAllProducts,
  addProduct,
  getOneProducts,
  updateProduct,
  deleteProducts,
}