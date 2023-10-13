// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const { jwtSecret } = require('../config/config'); // Import your JWT secret

module.exports = {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await db.User.create({ email, password: hashedPassword });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Registration failed' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await db.User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ error: 'Login failed' });
    }
  },
};
