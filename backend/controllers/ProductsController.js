import Products from "../models/ProductModel.js";

const getProducts = async (req, res) => {
  const products = await Products.findAll({
    // attributes: {
    //   name,price
    // }
  });
  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const product = await Products.findOne({
    where: {
      uuid: req.params.id,
    },
  });
};

const createProduct = async (req, res) => {};

const updateProduct = async (req, res) => {};
const deleteProduct = async (req, res) => {};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
