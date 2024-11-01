const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

const router = express.Router();

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Valid email is required").isEmail(),
    check("password", "Password needs to be 6 characters or more").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ message: "A user with this email address already exists" });
      }

      const newUser = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();

      res.send("user saved");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }

    res.json(req.body);
  }
);

module.exports = router;