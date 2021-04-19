const bcryptjs = require('bcryptjs');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');


class UserController {
  async users(req, res) {
    const users = await Users.findAll()
    return res.status(200).json(users)
  }

  async auth(req, res) {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email: email } })
    if (!user) {
      return res.status(401).json({ error: "Credenciais não encontradas" })
    }
    if (password) {
      const checkPassword = bcryptjs.compareSync(password, user.password);
      const { secret } = jwtConfig;
      jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '2h' }, (err, data) => {
        return res.status(200).json({ token: data })
      })
    }

  }

  async create(req, res) {
    const { name, email, password } = req.body;

    const salt = bcryptjs.genSaltSync(10)

    const userExist = await Users.findOne({
      where: { email: email }
    })
    if (userExist) {
      return res.status(409).json({ error: "Esse e-mail já está sendo utilizado no momento!" })
    }

    const password_hash = await bcryptjs.hash(password, salt)
    const user = await Users.create({ name, email, password: password_hash })
    return res.status(201).json({ message: "Usuária criado com sucesso!", user })
  }

}

module.exports = new UserController();