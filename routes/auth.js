const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../bin/models/usersSchem");
const router = express.Router();


router.post("/register", async (req, res) => {
  const errors = [];
  //tests user already exist
  const user = await User.findOne({ name: req.body.name }).exec();
  if (user !== null) errors.push("Ce pseudo est déjà utilisé");
  //tests empty username field
  if (req.body.name === undefined || req.body.name.lenght === 0)
    errors.push("Vous devez indiquer un pseudo");
  //tests empty password field
  if (req.body.password === undefined || req.body.password.lenght === 0)
    errors.push("Vous devez indiquer un mot de passe");
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
    if (!match) throw "Erreur d'authentification";
    return res.jsonRes("utilisateur connecté", null, null, 200);

   } catch(e) {
      res.jsonRes("Erreur lors de la connexion", null, e, 400);
   }
});

module.exports = router;
