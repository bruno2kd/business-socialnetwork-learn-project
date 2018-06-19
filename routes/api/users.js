const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const secretKey = require("../../config/keys").secretKey;

const router = express.Router();
const oneWeek = 7 * 24 * 3600;

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User Model
const User = require("../../models/User");

// @route       GET api/users/test
// @desc        test Users route
// @access      Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route       POST api/users/register
// @desc        Register User
// @access      Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route       POST api/users/login
// @desc        Login User
// @access      Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find user by email
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    } else {
      // Check for email
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT payload
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email
          };

          // Sign Token
          jwt.sign(payload, secretKey, { expiresIn: oneWeek }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          errors.password = "Password Incorrect";
          return res.status(400).json(errors);
        }
      });
    }
  });
});

// @route       GET api/users/current
// @desc        test Users route
// @access      private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
