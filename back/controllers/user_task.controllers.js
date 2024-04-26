import UserTask from "../models/user_task.model.js";

export const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide !"
    });
    return;
  }

  const newUserTask = new UserTask({
    idUser: req.body.idUser,
    idTask: req.body.idTask
  });

  UserTask.create(newUserTask, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la création de l'association utilisateur-tâche."
      });
    else res.send(data);
  });
};

export const findByUser = (req, res) => {
  UserTask.findByUser(req.params.idUser, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la recherche des tâches associées à cet utilisateur."
      });
    } else res.send(data);
  });
};

export const findByTask = (req, res) => {
  UserTask.findByTask(req.params.idTask, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la recherche des utilisateurs associés à cette tâche."
      });
    } else res.send(data);
  });
};

export const remove = (req, res) => {
  UserTask.remove(req.params.idUser, req.params.idTask, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Association utilisateur-tâche non trouvée avec idUser: ${req.params.idUser} et idTask: ${req.params.idTask}.`
        });
      } else {
        res.status(500).send({
          message: "Une erreur s'est produite lors de la suppression de l'association utilisateur-tâche."
        });
      }
    } else res.send({ message: "L'association utilisateur-tâche a été supprimée avec succès." });
  });
};
