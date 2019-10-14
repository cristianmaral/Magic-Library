const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'E-mail não cadastrado' });
    }
    else if (user.password != password) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }
    else {
      res.json(user);
    }
  },

  async store(req, res) {
    const { name, email, password, receiveNotifications } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }
    else {
      user = await User.create({ name, email, password, receiveNotifications });
      return res.json(user);
    }
  }
};