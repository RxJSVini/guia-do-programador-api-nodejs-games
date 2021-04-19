const supertest = require('supertest');
const app = require('../app')
const request = supertest(app);

test("Deve listar os usuários", async () => {
  const users = await request.get("/games/users")
    .then((response) => {
      expect(response.statusCode).toBe(200);
    }).catch((err) => {
      console.log(err)
    })

});