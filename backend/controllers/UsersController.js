import User from "../models/UserModel.js";
import argon2 from "argon2";

const getUsers = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await User.findAll({
        attributes: ["uuid", "name", "email", "role"],
      });
    } else {
      response = await User.findAll({
        attributes: ["uuid", "name", "email", "role"],
        where: {
          id: req.userId,
        },
      });
    }
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        uuid: req.params.id,
      },
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  const foundUser = await User.findOne({
    where: {
      email: email,
    },
  });

  if (foundUser) {
    return res
      .status(409)
      .json({ msg: "There is user with this email, can't create user" });
  }

  if (password !== confPassword)
    return res.status(400).json({ msg: "Password doesn't match" });

  if (password.length < 8)
    return res
      .status(400)
      .json({ msg: "Password must be at least 8 character" });

  const hashPassword = await argon2.hash(password);

  try {
    await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    res.status(201).json({ msg: "User created successfully" });
  } catch (e) {
    res.status(400).json({
      msg:
        e.name === "SequelizeValidationError" ? e.errors[0].message : e.message,
    });
  }
};

const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const { name, email, role, curPassword, newPassword, confNewPassword } =
    req.body;
  let hashNewPassword;
  if (newPassword.length > 0 || confNewPassword.length > 0) {
    const match = await argon2.verify(user.password, curPassword);
    if (!match)
      return res.status(400).json({ msg: "That is not your current password" });

    if (newPassword !== confNewPassword)
      return res.status(400).json({ msg: "Password doesn't match" });

    hashNewPassword =
      newPassword.length < 1 || newPassword === null
        ? user.password
        : await argon2.hash(newPassword);
  }

  try {
    await User.update(
      hashNewPassword
        ? {
            name,
            email,
            password: hashNewPassword,
            role,
          }
        : {
            name,
            email,
            role,
          },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "User updated successfully" });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};
const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });

  try {
    await User.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
