import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId)
    return res.status(401).json({ msg: "Please login to your account" });

  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });

  req.userId = user.id;
  req.role = user.role;
  next();
};

export const adminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  if (user.role !== "SUPERADMIN" && user.role !== "admin")
    return res.status(403).json({ msg: "Forbidden access" });

  next();
};

export const adminOrOwnerOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });

  if (
    user.role !== "SUPERADMIN" &&
    user.role !== "admin" &&
    user.uuid !== req.params.id
  )
    return res.status(403).json({ msg: "Forbidden access" });

  next();
};
