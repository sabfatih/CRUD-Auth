import { Op } from "sequelize";
import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";

const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Product.findAll({
        attributes: ["uuid", "name", "price", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Product.findAll({
        attributes: ["uuid", "name", "price", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
        where: {
          userId: req.userId,
        },
      });
    }
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

const getProductById = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Product.findOne({
        attributes: ["uuid", "name", "price", "createdBy"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
        where: {
          uuid: req.params.id,
        },
      });
    } else {
      response = await Product.findOne({
        attributes: ["uuid", "name", "price", "createdBy"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
        where: {
          [Op.and]: [{ uuid: req.params.id }, { userId: req.userId }],
        },
      });
    }
    if (!response) return res.status(404).json({ msg: "Product not found" });

    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

const createProduct = async (req, res) => {
  const { name, price } = req.body;

  try {
    await Product.create({ name, price, userId: req.userId });
    res.status(201).json({ msg: "Product created successfully" });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) return res.status(404).json({ msg: "Product not found" });
    const { name, price } = req.body;

    if (req.role === "admin") {
      await Product.update(
        { name, price },
        {
          where: {
            uuid: req.params.id,
          },
        }
      );
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json({ msg: "Forbidden access" });
      await Product.update(
        { name, price },
        {
          where: {
            [Op.and]: [{ uuid: req.params.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(201).json({ msg: "Product updated successfully" });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Product not found" });

    if (req.role === "admin") {
      await Product.destroy({
        where: {
          uuid: req.params.id,
        },
      });
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json({ msg: "Forbidden access" });

      await Product.destroy({
        where: {
          [Op.and]: [
            {
              uuid: req.params.id,
              userId: req.userId,
            },
          ],
        },
      });
    }

    res.status(201).json({ msg: "Product deleted successfully" });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
