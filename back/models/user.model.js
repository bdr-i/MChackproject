import pool from "../config/db.js";

class User {
  constructor(user) {
    this.identifiant = user.identifiant;
    this.passwordUser = user.passwordUser;
    this.email = user.email;
    this.point = user.point;
    this.idRole = user.idRole;
  }

  static create(newUser, result) {
    pool.query("INSERT INTO User SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  }

  static findById(idUser, result) {
    pool.query("SELECT * FROM User WHERE idUser = ?", idUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  }
  
  static updateById(id, user, result) {
    pool.query(
      "UPDATE User SET \
       identifiant = ?,\
       passwordUser = ?,\
       email = ?,\
       point= ?,\
       idRole = ?\
       WHERE idUser = ?",
      [user.identifiant,
       user.passwordUser,
       user.email,
       user.point,
       user.idRole,
       id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // Aucun utilisateur trouvé avec cet ID
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("Utilisateur mis à jour avec succès: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  }
  

  static getAll(result) {
    let query = "SELECT * FROM User";
    
    pool.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Users: ", res);
      result(null, res);
    });
  }

  static remove(idUser, result) {
    pool.query("DELETE FROM User WHERE idUser = ?", idUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted user with id: ", idUser);
      result(null, res);
    });
  }

  static removeAll(result) {
    pool.query("DELETE FROM User", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  }
}

export default User;
