const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");

const UsersService = require("../../../services/users");

passport.use(
  new BasicStrategy(async (email, password, cb) => {
    const usersService = new UsersService();
    try {
      const user = await usersService.getUser({ email });
      if (!user) {
        return cb(boom.unauthorized(), false);
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }
      delete user.password;
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);
