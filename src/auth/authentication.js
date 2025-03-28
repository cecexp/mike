import { Router } from "express";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import helpers from "../lib/helpers.js";

const auth = Router();

auth.post("/logIn", async (req, res) => {
  const { username, password } = req.body;

  const rows = await pool.query("SELECT * FROM users WHERE username = ?;", [username]);

  if (rows.length === 0) {
    console.log("The User does not exist");
    res.redirect("/");
  } else {
    const user = rows[0];
    const matchedPassword = await helpers.matchPassword(password, user.password);
    if (!matchedPassword) {
      console.log("passwords did not match");
      res.redirect("/");
    } else {
      const token = jwt.sign({ id: user.userid, username: user.username}, process.env.SECRET_KEY, { expiresIn: "3h" });
      res.cookie("access_cookie", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 3, // 3 hours
      });
      res.redirect("/users");
    }
  }
});

auth.post("/signUp", async (req, res) => {
  const { username, password } = req.body;

  if (username != "" && password != "" && password.length >= 8) {
    const encryptPassword = await helpers.encryptPassword(password);

    const values = [username, encryptPassword];

    await pool.query("INSERT INTO users (username, password) values(?)", [values], (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/signup");
      } else {
        console.log(result);
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/signup");
  }
});

auth.get("/logOut", helpers.isLoggedIn, (req, res) => {
  res.clearCookie("access_cookie").redirect("/");
});

export default auth;
