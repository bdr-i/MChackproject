import Task from "../models/task.model.js";

export const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide !"
    });
    return;
  }

  const newTask = new Task({
    label: req.body.label,
    description: req.body.description,
    due_date: req.body.due_date,
    completed: req.body.completed,
    priority: req.body.priority,
    reward: req.body.reward,
  });

  Task.create(newTask, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la création de la tâche."
      });
    else res.send(data);
  });
};

export const findAll = (req, res) => {
  Task.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération des tâches."
      });
    else res.send(data);
  });
};

export const findOne = (req, res) => {
  Task.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Tâche non trouvée avec l'identifiant ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors de la récupération de la tâche avec l'identifiant " + req.params.id
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

  Task.updateById(
    req.params.id,
    {
      label: req.body.label,
      description: req.body.description,
      due_date: req.body.due_date,
      status: req.body.status,
      priority: req.body.priority,
      reward: req.body.reward
    },
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Tâche non trouvée avec l'identifiant ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Erreur lors de la mise à jour de la tâche avec l'identifiant " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

export const deleteById = (req, res) => {
  Task.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Tâche non trouvée avec l'identifiant ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Impossible de supprimer la tâche avec l'identifiant " + req.params.id
        });
      }
    } else res.send({ message: `Tâche a été supprimée avec succès !` });
  });
};

export const deleteAll = (req, res) => {
  Task.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la suppression de toutes les tâches."
      });
    else res.send({ message: `Toutes les tâches ont été supprimées avec succès !` });
  });
};
