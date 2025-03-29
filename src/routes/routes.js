import { Router } from "express";
import pool from "../db.js";
import helpers from "../lib/helpers.js";

const routes = Router();

routes.get("/", helpers.isNotLoggedIn, (req, res) => res.render("login"));

routes.get("/signup", helpers.isNotLoggedIn, (req, res) => res.render("register"));

routes.get("/users", helpers.isLoggedIn, async (req, res) => {
  const users = await pool.query("SELECT userid, username, password FROM users");
  res.render("users", { users });
});

export default routes;
