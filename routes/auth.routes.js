const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/user/register", controller.signup);
  app.post("/api/user/login", controller.login);

//THIS IS HOW YOU CAN USE MIDDLEWARE
  // app.post("/api/user/login", [authJwt.verifyToken], controller.login);

};
