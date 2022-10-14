const request = require('supertest');
const app = require("../config/app")
const monggoDB = require("../config/database")



describe('Testing Admin app', () => {
  beforeEach(() => {
    monggoDB.connect();
  })

  describe('testing user module', () => {


    describe('GET /getAllUsers', () => {

      test('should read all users', async () => {
        const response = await request(app).get("/getAllUsers");
        expect(response.body.code).toBe(200)
      })
    })


    describe('POST /login', () => {

      let data = {
        "email": "siwiy50569@ishyp.com",
        "password": "Fake@account58"
      }

      test('should sign in an user', async () => {
        const response = await request(app).post("/login").send(data);
        expect(response.body.code).toBe(201)
      })

      test('should return 404 user not found', async () => {
        const response = await request(app).post("/login")
          .send({
            "email": "siwiy50569fd@ishyp.com",
            "password": "Fake@account58"
          });
        expect(response.body.code).toBe(404)
      })

      test('should return 400 Incorrect password user', async () => {
        const response = await request(app).post("/login")
          .send({
            "email": "siwiy50569@ishyp.com",
            "password": "Fake24@account58"
          });
        expect(response.body.code).toBe(400)
      })

      test('should return message password must be entered', async () => {
        const response = await request(app).post("/login")
          .send({
            "email": "siwiy50569@ishyp.com"
          });
        expect(response.body.message).toBe("password must be entered")
      })

      



    })





  })


  afterAll((done) => {
    monggoDB.disconnect(done);
  })
})