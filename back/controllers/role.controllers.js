import Role from "../models/role.model.js";

export const create =(req, res)=>
{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

      const role = new Role({
        roleName: req.body.roleName,
      });

      Role.create(role, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Some error occurred while creating the role."
          });
        else res.send(data);
      });
 };
 export const findAll= (req, res) => {
    const nom = req.query.roleName;
  
    Role.getAll(nom, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving roles."
        });
      else res.send(data);
    });
  };
  
  export const findOne = (req, res) => {
    Role.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found role with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving role with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };
  
  export const update = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Role.updateRole(
      req.params.id,
      new Role(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found role with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating role with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };
  
  export const deleteById = (req, res) => {
    Role.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found role with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete role with id " + req.params.id
          });
        }
      } else res.send({ message: `Role was deleted successfully!` });
    });
  };
  
  export const deleteAll = (req, res) => {
    Role.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while removing all roles."
        });
      else res.send({ message: `All roles were deleted successfully!` });
    });
  };
  