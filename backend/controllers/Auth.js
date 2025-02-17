import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const logIn = async (req, res) => {
  console.log(req.body);
  console.log("tess1");

  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  console.log("tess2");

  if (!user) return res.status(404).json({ msg: "User not found" });

  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  req.session.userId = user.uuid;
  console.log("tess3");

  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;

  res.status(200).json({ uuid, name, email, role });
};

export const Me = async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ msg: "Please login to your account" });

  const user = await Users.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.status(200).json(user);
};

export const logOut = (req, res) => {
  req.session.destroy((e) => {
    if (e) return res.status(400).json({ msg: "Can't logout" });

    res.status(200).json({ msg: "You've been logout" });
  });
};
