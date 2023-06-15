const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../bin/models/usersSchem");
const { Session } = require("../bin/models/sessionsSchem");
const router = express.Router();
const validator = require("validator");

router.post("/register", async (req, res) => {
  const user = await User.findOne({ name: req.body.name }).exec();
  const errors = [];
 
  //tests user already exist
 if (req.body.name === undefined ||req.body.name.length === 0) 
    errors.push("Nom d'utilisateur manquant");
    else if (user !== null) errors.push("Nom d'utilisateur déjà utilisé");
  //test password
  if (req.body.password === undefined || req.body.password.length === 0)
    errors.push("Mot de passe manquant");
  //test email
  if (req.body.email === undefined || req.body.email.length === 0 || !validator.isEmail(req.body.email))
    errors.push("Email manquant");
  //test errors forms
  if (errors.length > 0) res.jsonRes("Formulaire invalide", null, errors, 422);
  else {
    //create user
    const newUser = new User({
      name: req.body.name,
      password: req.passwordHash(req.body.password),
      email: req.body.email,
    });
    //add user to db
    newUser
      .save()
      .then(() => {
        res.jsonRes("utilisateur créé", null, null, 201);
      })
      .catch((err) => {
        res.jsonRes(
          "Erreur lors de la création de l'utilisateur",
          null,
          err,
          400
        );
      });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name }).exec();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      throw "Erreur d'authentification";
    } else {
      const token = jwt.sign({ id: user._id, name: user.name }, "cookies");
      const userData = user;
      delete userData._doc.password;
      const newSession = new Session({
        user_id: user._id,
        token: token,
        user_agent: req.headers["user-agent"],
        created_at: new Date(),
      });
      newSession.save().then(() => {
        return res.jsonRes(
          "utilisateur connecté",
          { token, userData },
          null,
          200
        );
      })
      .catch((err) =>{
        res.jsonRes("Une  erreur à eu lieu lors de la création de la session !", null, err, 400);
      } );
    }
  } catch (e) {
    res.jsonRes("Erreur lors de la connexion", null, e, 400);
  }
});

module.exports = router;
