const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.urlencoded({ extended: "true" }));
app.use(express.json());
process.env.PRODUCTION === "true"
  ? app.use(cors({ credentials: true, origin: "https://industrialisasi.site" }))
  : app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use("/welcome", routes.welcome);
app.use("/register", routes.register);
app.use("/email", routes.email);
app.use("/username", routes.username);
app.use("/email-to-be-registered", routes.email_to_be_registered);
app.use("/verifier", routes.verifier);
app.use("/login", routes.login);
app.use("/posts", routes.posts);
app.use("/post", routes.post);
app.use("/logout", routes.logout);
app.use("/can-user-post", routes.can_user_post);

module.exports = app;
