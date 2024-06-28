const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

exports.signup = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'Email is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword,role });
    await user.save();

    res.status(201).send({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).send({ error: 'Error creating user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      secretKey,
      { expiresIn: '8h' }
    );

    res.status(200).send({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).send({ error: 'Error logging in' });
  }
};