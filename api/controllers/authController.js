const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// REGISTER (CREATE USER)
router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please enter valid email").isEmail(),
    check("password", "Please enter password").not().isEmpty(),
    check("password", "Need 8 characters for password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // CHECK FOR EMPTY USERNAME ENTRY
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // CHECK IF USERNAME ALREADY EXIST
      let user = await User.findOne({
        username: req.body.username,
      });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Username already exists" }] });
      }

      // CHECK IF EMAIL ALREADY EXIST
      let checkEmail = await User.findOne({
        email: req.body.email,
      });
      if (checkEmail) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already exists" }] });
      }

      // DEFINE NEW USER
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        // CRYPTO JS ENCRYPTION
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.CRYPTO_SECRET
        ).toString(),
      });

      // SAVING NEW USER
      const savedUser = await newUser.save();

      // 201 = successfully added
      res.status(201).json({ savedUser });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// USER LOGIN
router.post(
  "/login",
  [
    check("username", "Please enter username").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // CHECK FOR EMPTY USERNAME ENTRY
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // CHECK IF USERNAME ALREADY EXIST
      const user = await User.findOne({ username: req.body.username });
      // console.log(user);
      if (!user) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Invalid Username or Password" }] });
      }

      // CHECK INPUT PASSWORD
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.CRYPTO_SECRET
      );

      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (OriginalPassword !== req.body.password) {
        return res.status(401).json({ errors: [{ msg: "Invalid Password" }] });
      }

      // SIGN JWT TOKEN TO REMEMBER USER HAS LOGGED IN
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // destructure user obj
      // omit and to not show password to client
      const { password, ...others } = user._doc;

      res
        .status(200)
        .cookie("jwt", accessToken, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
        }) //cookie expires in 1hr after userloggedIn
        .json({ ...others, accessToken });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// LOGOUT
router.get("/logout", (req, res) => {});

module.exports = router;
