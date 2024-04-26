import pool from "../config/db.js";

class UserTask {
  constructor(userTask) {
    this.idUser = userTask.idUser;
    this.idTask = userTask.idTask;
  }

  static create(newUserTask, result) {
    pool.query("INSERT INTO User_Task SET ?", newUserTask, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created user_task: ", { ...newUserTask });
      result(null, { ...newUserTask });
    });
  }

  static findByUser(idUser, result) {
    pool.query("SELECT * FROM User_Task WHERE idUser = ?", idUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("found user_tasks for user with idUser: ", idUser);
      result(null, res);
    });
  }

  static findById(idUser, idTask, result) {
    pool.query("SELECT * FROM User_Task WHERE idUser = ? AND idTask = ?", [idUser, idTask], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found user_task: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found User_Task with the id
      result({ kind: "not_found" }, null);
    });
  }
  
  static findByTask(idTask, result) {
    pool.query("SELECT * FROM User_Task WHERE idTask = ?", idTask, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("found user_tasks for task with idTask: ", idTask);
      result(null, res);
    });
  }

  static remove(idUser, idTask, result) {
    pool.query("DELETE FROM User_Task WHERE idUser = ? AND idTask = ?", [idUser, idTask], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User_Task with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted user_task with idUser: ", idUser, " and idTask: ", idTask);
      result(null, res);
    });
  }
}

export default UserTask;
