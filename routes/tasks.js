const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/crypt");
const { User } = require("../bin/models/usersSchem");
const { Task } = require("../bin/models/taskSchem");

// Get all tasks from user
router.get("/:user/list", auth, async (req, res, next) => {
  const user = await User.findOne({ name: req.params.user }).exec();
  if (user === null) res.jsonRes("Utilisateur non trouvé", null, null, 404);
  else {
    const tasks = await Task.find({ user_name: req.params.user }).exec();
    res.jsonRes("Liste des tâches", tasks, null, 200);
  }
});

//Create tasks
router.post("/:user/create", auth, async (req, res, next) => {
  const errors = [];
  const user = await User.findOne({ name: req.params.user }).exec();
  console.log(user._id.toString());
  //check if user is connected
  if (req.params.user === undefined || user === null) {
    errors.push("Utilisateur non valide");
  }
  //check if name is empty
  if (req.body.task_name === undefined || req.body.task_name.length === 0) {
    errors.push("Nom de tâche manquant");
  }
  //check if description is empty
  if (req.body.description === undefined || req.body.description.length === 0) {
    errors.push("Description de tâche manquante");
  }
  if (errors.length > 0) res.jsonRes("Formulaire invalide", null, errors, 422);
  else {
    const done = req.body.done === undefined ? false : true;
    const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const formattedTime = currentDate.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    const newTask = new Task({
      task_name: req.body.task_name,
      description: req.body.description,
      created_at: `${formattedDate} ${formattedTime}`,
      done: done,
      user_name: req.params.user,
    });

    newTask
      .save()
      .then(() => {
        res.jsonRes("Tâche créé", null, null, 201);
      })
      .catch((err) => {
        res.jsonRes("Erreur lors de la création de la tâche", null, err, 400);
      });
  }
});

//Update tasks
router.put("/:user/update/:id", auth, async (req, res, next) => {
  try {
    const errors = [];
    const user = await User.findOne({ name: req.params.user }).exec();
    const task = await Task.findOne({ _id: req.params.id }).exec();
    //check if user is connected
    if (req.params.user === undefined || user === null)
      errors.push("Vous devez être authentifié pour modifier une tâche");
    //check if task exist
    if (req.params.id === undefined || task === null)
      errors.push("Vous ne pouvez pas modifier une tâche qui n'existe pas");
    //check if name is empty
    if (req.body.task_name === undefined || req.body.task_name.length === 0) {
      errors.push("Nom de tâche manquant");
    }
    //check if description is empty
    if (
      req.body.description === undefined ||
      req.body.description.length === 0
    ) {
      errors.push("Description de tâche manquante");
    }
    if (errors.length > 0)
      res.jsonRes("Formulaire invalide", null, errors, 422);
    else {
      const done = req.body.done === undefined ? false : true;
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const formattedTime = currentDate.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Update the task
      task.task_name = req.body.task_name;
      task.description = req.body.description;
      task.updated_at = `${formattedDate} ${formattedTime}`;
      task.done = done;

      task
        .save()
        .then(() => {
          res.jsonRes("Tâche mise à jour", null, null, 200);
        })
        .catch((err) => {
          res.jsonRes(
            "Erreur lors de la mise à jour de la tâche",
            null,
            err,
            400
          );
        });
    }
  } catch (err) {
    res.jsonRes("Erreur lors de la mise à jour de la tâche", null, err, 400);
  }
});

//Delete tasks
router.delete("/:user/delete/:id", auth, async (req, res, next) => {
  try {
    const errors = [];
    const user = await User.findOne({ name: req.params.user }).exec();
    const task = await Task.findOne({ _id: req.params.id }).exec();
    //check if user is connected
    if (req.params.user === undefined || user === null)
      errors.push("Vous devez être authentifié pour supprimer une tâche");
    //check if task exist
    if (req.params.id === undefined || task === null)
      errors.push("Vous ne pouvez pas supprimer une tâche qui n'existe pas");
    if (errors.length > 0)
      res.jsonRes("Formulaire invalide", null, errors, 422);
    else {
      // Delete the task
      task
        .deleteOne()
        .then(() => {
          res.jsonRes("Tâche supprimée", null, null, 200);
        })
        .catch((err) => {
          res.jsonRes(
            "Erreur lors de la suppression de la tâche",
            null,
            err,
            400
          );
        });
    }
  } catch (err) {
    res.jsonRes("Erreur lors de la suppression de la tâche", null, err, 400);
  }
});

module.exports = router;
