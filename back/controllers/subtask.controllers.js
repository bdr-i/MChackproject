import Subtask from "../models/subTask.model.js";

export const create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide !"
    });
    return;
  }

  const newSubtask = new Subtask({
    idTask: req.body.idTask,
    subtask_label: req.body.subtask_label,
    due_date: req.body.due_date,
    status: req.body.status
  });

  Subtask.create(newSubtask, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la création de la sous-tâche."
      });
    else res.send(data); 
  });
};

export const findAll = (req, res) => {
  Subtask.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération des sous-tâches."
      });
    else res.send(data); 
  });
};

export const findOne = (req, res) => {
  Subtask.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Sous-tâche non trouvée avec l'identifiant ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors de la récupération de la sous-tâche avec l'identifiant " + req.params.id
        });
      }
    } else res.send(data);
  });
};

export const updateById = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide !"
    });
    return;
  }

  Subtask.updateById(
    req.params.id,
    {
      idTask: req.body.idTask,
      subtask_label: req.body.subtask_label,
      due_date: req.body.due_date,
      status: req.body.status
    },
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Sous-tâche non trouvée avec l'identifiant ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Erreur lors de la mise à jour de la sous-tâche avec l'identifiant " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

export const deleteById = (req, res) => {
  Subtask.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Sous-tâche non trouvée avec l'identifiant ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Impossible de supprimer la sous-tâche avec l'identifiant " + req.params.id
        });
      }
    } else res.send({ message: `Sous-tâche a été supprimée avec succès !` });
  });
};

export const deleteAll = (req, res) => {
  Subtask.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la suppression de toutes les sous-tâches."
      });
    else res.send({ message: `Toutes les sous-tâches ont été supprimées avec succès !` });
  });
};
