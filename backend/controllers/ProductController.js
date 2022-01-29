const Product = require("../models/product");
const jwt = require('jsonwebtoken');


const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (err) {
    console.log(err);
  }
};

const productDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    res.status(200).send(product);
  } catch (err) {
    console.log(err);
  }
};

const addProduct = async (req, res, next) => {
  const token =  await req.cookies.jwt;
  const userId = await jwt.verify(token,"secret key",(error,decodedToken)=>{
    if(error)  res.status(400).send(error);
    return decodedToken.id;
    });
  try {
    const productObj = {
      userId: userId,
      title: req.body.title,
      imgUrl: req.body.imgUrl,
      price: req.body.price,
      description: req.body.description,
    };

    await Product.create(productObj);
    const product = await Product.findAll();
    res.status(200).send(product);
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (req, res, next) => {
  const token =  await req.cookies.jwt;
  const userId = await jwt.verify(token,"secret key",(error,decodedToken)=>{
    if(error)  res.status(400).send(error);
    return decodedToken.id;
    });
  try {
    const id = req.params.productId;

    await Product.update(req.body, {
      where: { id: id, userId: userId },
    });
    const modifyProducts = await Product.findAll();

    res.status(200).send(modifyProducts);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteProduct = async (req, res, next) => {
  const token =  await req.cookies.jwt;
  const userId = await jwt.verify(token,"secret key",(error,decodedToken)=>{
    if(error)  res.status(400).send(error);
    return decodedToken.id;
    });
  try {
    const id = req.params.productId;
    await Product.destroy({ where: { id: id, userId: userId } });
    const modifyProducts = await Product.findAll();
    res.status(200).send(modifyProducts);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllProducts,
  productDetail,
  addProduct,
  updateProduct,
  deleteProduct,
};
