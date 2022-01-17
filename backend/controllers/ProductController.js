const Product = require("../models/product");

const getAllProducts = async (req, res, next) => {
  const products = await Product.findAll();
  res.send(products);
};

const productDetail = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByPk(id);
  res.status(200).send(product);
};

const addProduct = async (req, res, next) => {
  const { userId } = req.body;
  const productObj = {
    userId: userId,
    title: req.body.title,
    imgUrl: req.body.imgUrl,
    price: req.body.price,
    description: req.body.description,
  };

  const product = await Product.create(productObj);
  res.status(200).send(product);
};

const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.update(req.body, { where: { id: id } });
  res.status(200).send(product);
};

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.destroy({ where: { id: id } });
  res.status(200).json("成功刪除");
};

module.exports = {
  getAllProducts,
  productDetail,
  addProduct,
  updateProduct,
  deleteProduct,
};
