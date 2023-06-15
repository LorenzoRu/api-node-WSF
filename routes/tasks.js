const express = require('express');
const router = express.Router();
const { User } = require("../bin/models/usersSchem");
const { Task } = require("../bin/models/taskSchem");
//Create tasks
router.post('/create', async (req, res, next) => {
  const errors = [];
  const user = await User.findOne({ name: req.body.user_name }).exec();
  console.log(user);
  //check if user is connected
  if (req.body.user_name === undefined) {
    errors.push("Utilisateur non valide");
  };
  //check if name is empty
  if (req.body.name === undefined || req.body.name.length === 0) {
    errors.push("Nom de tâche manquant");
  };
  //check if description is empty
  if (req.body.description === undefined || req.body.description.length === 0) {
    errors.push("Description de tâche manquante");
  };
  if (errors.length > 0) res.jsonRes("Formulaire invalide", null, errors, 422);
  else {
   const done = req.body.done === undefined ? false : true;
    const newTask = new Task({
      name: req.body.name,
      description: req.body.description,
      created_at: Date.now(),
      updated_at: Date.now(),
      done: done,
      user_name: req.body.user_name,
    });

    newTask
      .save()
      .then(() => {
        res.jsonRes("Tâche créé", null, null, 201);
      })
      .catch((err) => {
        res.jsonRes(
          "Erreur lors de la création de la tâche",
          null,
          err,
          400
        );
      });
  };
});


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
