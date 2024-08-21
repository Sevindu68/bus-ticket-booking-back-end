const express = require("express");
const route = express.Router();
const normalUser = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const User = require("../models/user");

route.post("/register", async (req, res) => {
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

route.post("/login", async (req, res) => {
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
  } else {
    res.status(404).json("User nor found");
  }
});

route.post("/admin", async (req, res) => {
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
      role: "Admin",
    });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

route.post("/logout", (req, res) => {
  res.cookie("token", "");
  res.status(200).send("Logout Succefully");
});

module.exports = route;
