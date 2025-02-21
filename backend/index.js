import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import ProductRoute from "./routes/ProductRoute.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import SequelizeStore from "connect-session-sequelize";
import { Buffer } from "buffer";
globalThis.Buffer = Buffer;

import db from "./config/Database.js";
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db,
});

dotenv.config();

const app = express();
app.use(express.json());

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(ProductRoute);
app.use(UserRoute);
app.use(AuthRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server is running...");
});

// store.sync();
