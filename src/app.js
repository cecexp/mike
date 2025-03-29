import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

import "./db.js";
import routes from "./routes/routes.js";
import auth from "./auth/authentication.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Settings
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Global variables
app.use((req, res, next) => {
  const token = req.cookies.access_cookie;
  req.session = { user: null };

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    req.session.user = data;
  } catch {}

  app.locals.user = req.session.user;

  next();
});

// Routes
app.use(routes);
app.use(auth);

// Public
app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"));
console.log("SERVER IS LISTENING ON PORT", app.get("port"));
