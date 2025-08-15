const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/user");

// ✅ Signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashedPassword });
    if(email==="muzeemsaifi88@gmail.com" && password === "Admin"){
      user.role ="admin";
    }
    await user.save();

    res.redirect("/login.html");
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Server error");
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).send("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    
    const isAdmin = user.role;
    console.log(user.role);
    req.session.user = {
      email: user.email,
      role: isAdmin, 
    };
    

    res.redirect("/home.html");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error");
  }
});

router.get("/role", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }
  
  res.json(req.session.user);
});

module.exports = router;
