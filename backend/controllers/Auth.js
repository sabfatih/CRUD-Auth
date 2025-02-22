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

  if (!user)
    return res.status(404).json({ msg: "User not found or wrong password" });

  const match = await argon2.verify(user.password, req.body.password);
  if (!match)
    return res.status(404).json({ msg: "User not found or wrong password" });

  req.session.userId = user.uuid;

  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;

  res.status(200).json({ uuid, name, email, role });
};

export const Me = async (req, res) => {
  // res.setHeader(
  //   "Cache-Control",
  //   "no-store, no-cache, must-revalidate, proxy-revalidate"
  // );
  // res.setHeader("Pragma", "no-cache");
  // res.setHeader("Expires", "0");

  // ^^^^^^^^^^^^^^^^^^^^^^^^^^
  // if i want to remove the bug that user still can access prev page when they're just logged out,
  // i can prevent the cache

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
