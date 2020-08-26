var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest');
// var request = require('request');
const User = require('../models/User');


  var user;

describe('Register API', function() {
  it("Register successful", async () => {
      describe('Controller Testing:', function() {
            beforeEach(function(done) {
                user = new User({
                  first_name:'admin',
                  last_name: 'admin1',
                  email: 'admin@gmail.com',
                  password:'123456789'
                });
                user.save();

            request(app).post('/users/register') // revised
                .send( {first_name:'admin',last_name: 'admin1',email: 'admin@gmail.com',password:'123456789'} )
                .end(function(err, res) {
                    should.not.exist(err);
                    done();
                });
        });
    })
  });
})


describe('Login API', function() {
    it("web app running", async () => {
      const result = await request(app).get("/")
          .send({
              origin: "localhost:7000",
          })
          .expect("Content-Type", /html/)
          .expect(200);
  });

  it("login success", async () => {
    describe('Controller Testing:', function() {
          beforeEach(function(done) {
              user = new User({
                first_name:'admin',
                last_name: 'admin1',
                email: 'admin@gmail.com',
                password:'123456789'
              });
              user.save();
          request(app).post('/users/login') // revised
              .send( {email: 'admin@gmail.com',password:'123456789'} )
              .end(function(err, res) {
                  should.not.exist(err);
                  done();
              });
      });
  })
});

});




