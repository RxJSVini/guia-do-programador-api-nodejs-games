const { Router } = require('express');
const Games = require('./models/Games')
const routes = Router();

const DB = {
  games: [
    {
      id: 23,
      title: "Call of duty MW",
      year: 2019,
      price: 60
    },
    {
      id: 65,
      title: "Sea of thieves",
      year: 2018,
      price: 40
    },
    {
      id: 102,
      title: "Ghost of de Shima",
      year: 2020,
      price: 140
    }
  ]

}
routes.get('/games', (req, res) => {
  return res.status(201).json(DB.games)
})

routes.get('/games/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: 'Bad Request 400' })
  } else {
    const id = req.params.id
    const busca = DB.games.find(a => id == a.id)
    if (busca) {
      return res.status(200).json({ message: busca })
    }
    return res.status(404).json({ error: 'Not Found' })

  }
})

routes.post("/games/add", (req, res) => {
  const { id, title, price, year } = req.body;
  const busca = DB.games.find(a => id == a.id)
  if (busca) {
    return res.status(409).json({ error: 'id dúplicado' })
  }
  DB.games.push({ id, title, price, year })
  return res.json({ games: DB.games })
})

routes.delete("/games/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: 'Bad Request 400' })
  } else {
    const id = req.params.id
    const index = DB.games.findIndex(d => id == d.id)
    if (index == -1) {
      return res.status(400).json({ error: 'Erro 404!' })
    } else {
      DB.games.splice(index, 1)
      return res.status(200).json(DB.games)
    }

  }
})

routes.put("/games/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: 'Bad Request 400' })
  } else {
    const id = parseInt(req.params.id)
    const game = DB.games.find(g => g.id == id)
    if (game != undefined) {
      const { title, price, year } = req.body;
      if (title != undefined) {
        game.title = title
      }
      if (price != undefined) {
        game.price = price;
      }
      if (year != undefined) {
        game.year = year;
      }
      return res.status(200).json(game)
    } else {
      DB.games.splice(index, 1)
      return res.status(200).json(DB.games)
    }

  }
})

module.exports = routes;