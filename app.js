const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

//routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();
//middlewares
const { jsonRes } = require("./middlewares/response");
const { passwordHash } = require("./middlewares/crypt");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    req.passwordHash = passwordHash;
    res.jsonRes = jsonRes;
    next();
});
// routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

module.exports = app;
