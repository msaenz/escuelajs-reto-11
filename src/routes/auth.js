const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const UsersService = require("../services/users");

const { config } = require("../config");

// Basic strategy
require("../utils/auth/strategies/basic");

function authApi(app) {
  const router = express.Router();
  app.use("/api/auth", router);

  const usersService = new UsersService();

  router.post("/sign-in", async (req, res, next) => {
    passport.authenticate("basic", (error, user) => {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }
        res.status(200).json(user);
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });
}

module.exports = authApi;
