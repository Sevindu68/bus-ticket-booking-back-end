const express = require("express");
const mongoose = require("mongoose");
const normalUser = require("./models/normalUser");
const Admin=require('./models/admin')
const User=require('./models/user')
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://sevindu:12345@cluster-1.xskbc.mongodb.net/?retryWrites=true&w=majority&appName=cluster-1"
).then(console.log("connected"));

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.post("/register", async (req, res) => {
  const { userName, password, email } = req.body;

  const salt = bcrypt.genSaltSync(8);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const newUser = normalUser({
      username: userName,
      email,
      password: hashedPassword,
      bookings: [],
      role: "Normal",
    });
    newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({
    username: userName,
  });

  if (user) {
    const isMatched = bcrypt.compareSync(password, user.password);
    if (isMatched) {
      const secretKey = process.env.JWT_SECRET;

      const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        secretKey,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      });
      res.status(200).json(user);
      
    } else {
      res.send("wrong credentials");
    }
  }else{
    res.status(404).json("User nor found")
  }
});

app.post("/admin", async (req, res) => {
  const { userName, password, email } = req.body;

  const existingAdmin = await Admin.findOne({ role: "Admin" });
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const salt = bcrypt.genSaltSync(8);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const newAdmin = new Admin({
      username: userName,
      email,
      password: hashedPassword,
      role: "Admin"
    });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post('/logout',(req,res)=>{
    res.cookie("token","")
})


app.listen(4000, () => {
  console.log("server is up and running on " + 4000);
});
