const { Router } = require('express');
const GameController = require('./controllers/GameController')
const UserController = require('./controllers/UserController');
const Auth = require('./middlewares/Auth')
const routes = Router();


//Rotas de usuários
routes.post('/games/users/auth', UserController.auth);
routes.get("/games/users", Auth, UserController.users);
routes.post('/games/users/add', Auth, UserController.create);

//Rotas de games
routes.get('/games', Auth, GameController.games);
routes.post("/games", Auth, GameController.add);
routes.delete("/games/:id", Auth, GameController.remove);
routes.put("/games/:id", Auth, GameController.update);

module.exports = routes;