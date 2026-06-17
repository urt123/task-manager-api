const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { users } = require("../data");
const { SECRET } = require("../middleware/auth");

// POST /auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required." });
  }

  // User খোঁজো
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Password check
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Wrong password." });
  }

  // JWT token generate
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

module.exports = router;