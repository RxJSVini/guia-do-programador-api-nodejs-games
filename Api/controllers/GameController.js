const Games = require('../models/Games');

class GameController {
  async games(req, res) {
    const jogos = await Games.findAll();
    console.log(req.headers)
    console.log("Litando jogos")
    return res.status(200).json(jogos)
  }

  async add(req, res) {
    const { title, price, year } = req.body;
    const jogos = await Games.create({ title, price, year });
    console.log("Adicionando jogos")
    return res.status(200).json({ games: jogos })
  }

  async remove(req, res) {
    const id = req.params.id;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Bad Request Error 400' })
    } else {
      const jogo = await Games.findByPk(id)
      if (jogo) {
        await jogo.destroy();
        return res.status(201).json({ message: 'Jogo deletado com sucesso' })
      } else if (!jogo) {
        return res.status(404).json({ error: "Jogo não encontrado!" });

      }
    }
    return res.status(200).json({ message: jogo })
  }

  async update(req, res) {
    const id = req.params.id;
    const { title, price, year } = req.body;
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Bad Request Error 400' });
    } else {
      const jogo = await Games.findByPk(id)
      if (jogo) {
        console.log("Removendo jogo")
        jogo.title = title;
        jogo.year = year;
        jogo.price = price;
        jogo.save()
        return res.status(201).json(jogo)
      } else if (!jogo) {
        return res.status(404).json({ message: 'Jogo não encontrado !' });
      }

    }
  }

}

module.exports = new GameController();