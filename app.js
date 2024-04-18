var express = require("express");
var logger = require("morgan");
var app = express();

app.use(logger("dev"));
app.use(express.json());

const usersRouter = require("./routes/users.routes");
app.use("/api/v1/users", usersRouter);
const authRouter = require("./routes/auth.routes");
app.use("/api/v1/auth/login", authRouter);

module.exports = app;
