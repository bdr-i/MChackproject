import pool from "../config/db.js";

class Role {
  constructor(role) {
    this.roleName = role.roleName;
  }

  static create(newRole, result) {
    pool.query("INSERT INTO Role SET ?", newRole, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created role: ", { id: res.insertId, ...newRole });
      result(null, { id: res.insertId, ...newRole });
    });
  }

  static findById(idRole, result) {
    pool.query("SELECT * FROM Role WHERE idRole = ?", idRole, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found role: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Role with the id
      result({ kind: "not_found" }, null);
    });
  }

  static getAll() {
    let query = "SELECT * FROM Role";
    
    pool.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return;
      }

      console.log("Roles: ", res);
    });
  }

  static remove(idRole, result) {
    pool.query("DELETE FROM Role WHERE idRole = ?", idRole, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Role with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted role with id: ", idRole);
      result(null, res);
    });
  }

  static removeAll(result) {
    pool.query("DELETE FROM Role", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} roles`);
      result(null, res);
    });
  }
}

export default Role;
