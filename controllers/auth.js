let { login } = require("../services/auth");

module.exports = {
  login: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      try {
        let user = await login(email, password);
        return res.status(201).json({
          status: true,
          message: "OK",
          data: user,
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err,
          data: null,
        });
      }
    } catch (err) {
      next(err);
    }
  },
};
