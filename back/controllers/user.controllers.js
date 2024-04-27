import User from "../models/user.model.js";

export const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide !"
    });
    return;
  }

  const newUser = new User({
    identifiant: req.body.identifiant,
    passwordUser: req.body.passwordUser,
    email: req.body.email,
    point: req.body.point,
    idRole: req.body.idRole
  });
  console.log(req.body);
  console.log(newUser);

  User.create(newUser, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la création de l'utilisateur."
      });
    else res.send(data);
  });
};

export const findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération des utilisateurs."
      });
    else res.send(data);
  });
};

export const findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Utilisateur non trouvé avec l'identifiant ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Erreur lors de la récupération de l'utilisateur avec l'identifiant " + req.params.id
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

  User.updateById(
    req.params.id,
    {
      identifiant: req.body.identifiant,
      passwordUser: req.body.passwordUser,
      email: req.body.email,
      point: req.body.point,
      idRole: req.body.idRole
    },
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Utilisateur non trouvé avec l'identifiant ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Erreur lors de la mise à jour de l'utilisateur avec l'identifiant " + req.params.id
          });
        }
      } else res.send(data); 
    }
  );
};

export const deleteById = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Utilisateur non trouvé avec l'identifiant ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Impossible de supprimer l'utilisateur avec l'identifiant " + req.params.id
        });
      }
    } else res.send({ message: `Utilisateur a été supprimé avec succès !` });
  });
};

export const deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la suppression de tous les utilisateurs."
      });
    else res.send({ message: `Tous les utilisateurs ont été supprimés avec succès !` });
  });
};
