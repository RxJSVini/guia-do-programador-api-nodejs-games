const supertest = require('supertest');
const app = require('../app')
const request = supertest(app);

test("Deve listar os games", async () => {
  const games = await request.get("/games")
    .then((response) => {
      expect(response.statusCode).toBe(200);
    }).catch((err) => {
      console.log(err)
    })

});