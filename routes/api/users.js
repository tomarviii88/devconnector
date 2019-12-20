const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route /api/users/
//@desc Test route
//@access Public

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Enter a valid Email').isEmail(),
    check('password', 'Enter a valid password').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //See if the user exists
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = gravatar.url({
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      const users = new User({
        name,
        email,
        password,
        avatar
      });

      //Encrypt the password
      const salt = await bcrypt.genSalt(10);
      users.password = await bcrypt.hash(password, salt);
      await users.save();

      //Generate json web token
      const payload = {
        user: {
          id: users.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server error');
    }

    console.log(req.body);
    //res.send('User Route');
  }
);

module.exports = router;
