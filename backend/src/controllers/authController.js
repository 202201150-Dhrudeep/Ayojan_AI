const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET ;

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
    // res
      // .status(201)
      // .cookie("token", token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
      //   maxAge: 24 * 60 * 60 * 1000, // 1 day
      // })
      res
  .status(201)
  .json({
    message: 'Signup successful',
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email
    }
  });
    
  } catch (err) {
    res.status(500).json({ message: 'Server error during signup' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'User not found' });
// console.log("1")
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });
// console.log("1")
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    console.log("1",token)
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
  .status(201)
  .json({
    message: 'Login successful',
    user: {
      _id: user._id,
      name: user.name,
      email: user.email
    }
  });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login' });
  }
};
