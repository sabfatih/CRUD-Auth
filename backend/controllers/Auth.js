import User from "../models/UserModel.js";
import argon2 from "argon2";

export const logIn = async (req, res) => {
  if (req.session.userId)
    return res.status(401).json({ msg: "Please log out first" });

  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) return res.status(404).json({ msg: "User not found" });

  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  req.session.userId = user.uuid;

  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;

  res.status(200).json({ uuid, name, email, role });
};

export const Me = async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ msg: "Please login to your account" });

  const user = await User.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.status(200).json(user);
};

export const logOut = (req, res) => {
  if (!req.session.userId)
    return res
      .status(401)
      .json({ msg: "Can't logout, You haven't login to your account yet" });
  req.session.destroy((e) => {
    if (e) return res.status(400).json({ msg: "Can't logout" });

    res.status(200).json({ msg: "You've been logout" });
  });
};
