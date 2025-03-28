import bcrypt from "bcryptjs";

const helpers = {};

//These are functions to encrypt and match passwords
helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e);
  }
};

helpers.isLoggedIn = (req, res, next) => {
  const { user } = req.session;

  if (user != null) {
    return next();
  }
  return res.redirect("/");
};

helpers.isNotLoggedIn = (req, res, next) => {
  const { user } = req.session;

  if (user == null) {
    return next();
  }
  return res.redirect("/users");
};

export default helpers;
