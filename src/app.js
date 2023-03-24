const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.use(express.urlencoded({ extended: "true" }));
app.use(express.json());
//app.use(cors({"credentials":true, "origin":"http://localhost:3000"}));
app.use(cors());
app.use(cookieParser());

app.use("/", routes.root);
app.use("/register", routes.register);
app.use("/email", routes.email);
app.use("/username", routes.username);
app.use("/sendemail", routes.sendemail);
app.use("/verifier", routes.verifier);
app.use("/login", routes.login);
app.use("/posts", routes.posts);
app.use("/post", routes.post);

module.exports = app;
