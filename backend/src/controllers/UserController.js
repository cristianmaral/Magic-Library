const bcrypt = require('bcrypt');

const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { name, email, password, receiveNotifications } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }
    user = await User.create({
      admin: false,
      email,
      name,
      password: bcrypt.hashSync(password, 10),
      receiveNotifications
    });
    return res.json(user);
  }
};