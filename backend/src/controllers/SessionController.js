const bcrypt = require('bcrypt');

const User = require('../models/User');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'E-mail não cadastrado' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }
    res.json(user);
  }
};