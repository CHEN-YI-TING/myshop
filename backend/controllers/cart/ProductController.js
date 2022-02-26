const Like = require("../../models/like");
const Product = require("../../models/product");

const getAllProducts = async (req, res, next) => {
  const userId = req.userId;
  try {
    //product has many likes

    const products = await Product.findAll({ include: [Like] });
    //every user has clicked like for products
    if (userId === undefined) {
      return res
        .status(201)
        .send({ products: products, error: "401錯誤:用戶未授權" });
    } else {
      const likedProducts = await Like.findAll({ where: { userId: userId } });
      res
        .status(200)
        .send({ products: products, likedProducts: likedProducts });
    }
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

//admin
const addProduct = async (req, res, next) => {
  const userId = req.userId;
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
    res.status(201).send(product);
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (req, res, next) => {
  const userId = req.userId;
  try {
    const id = req.params.productId;

    await Product.update(req.body, {
      where: { id: id, userId: userId },
    });
    const modifyProducts = await Product.findAll();

    res.status(201).send(modifyProducts);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteProduct = async (req, res, next) => {
  const userId = req.userId;
  try {
    const id = req.params.productId;
    await Product.destroy({ where: { id: id, userId: userId } });
    const modifyProducts = await Product.findAll();
    res.status(201).send(modifyProducts);
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
