const express = require("express");
const mongoose = require("mongoose");
const normalUser = require("./models/normalUser");
const Admin = require("./models/admin");
const User = require("./models/user");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("./routes/users");
require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://sevindu:12345@cluster-1.xskbc.mongodb.net/?retryWrites=true&w=majority&appName=cluster-1"
  )
  .then(console.log("connected"));

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(user);

app.listen(4000, () => {
  console.log("server is up and running on " + 4000);
});
