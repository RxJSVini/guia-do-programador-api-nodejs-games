const jwtConfig = require('../config/jwtConfig');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authToken = req.headers['authorization']
  if (authToken != undefined) {
    const baerer = authToken.split(" ")
    const token = baerer[1];

    jwt.verify(token, jwtConfig.secret, (err, data) => {
      if (err) {
        return res.status(401).json({ error: "Token inválido" })
      } else {
        req.token = token;
        req.loggedUser = { id: data.id, email: data.email }
        return next();
      }
    })


  } else {
    return res.status(401).json({ error: "Token inválido " })

  }
}