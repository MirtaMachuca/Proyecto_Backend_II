import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import hbs from "express-handlebars";
import path from "path";
import passport from "passport";
import { fileURLToPath } from "url";

import config from "./config/index.js";
import usersRouter from "./routes/users.router.js";
import sessionRouter from "./routes/session.router.js";
import viewsRouter from "./routes/views.router.js";
import initializedPassport from "./config/passport/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { PORT, MONGO_URI, SECRET } = config;
const app = express();

app.engine("handlebars", hbs.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
}));

initializedPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/session", sessionRouter);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));

mongoose.connect(MONGO_URI, { dbName: "pre_entregaI" })
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });
