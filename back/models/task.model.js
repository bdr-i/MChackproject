import pool from "../config/db.js";

class Task {
  constructor(task) {
    this.label = task.label;
    this.description = task.description;
    this.due_date = task.due_date;
    this.status = task.status;
    this.priority = task.priority;
    this.reward = task.reward;
  }

  static create(newTask, result) {
    pool.query("INSERT INTO Task SET ?", newTask, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created task: ", { id: res.insertId, ...newTask });
      result(null, { id: res.insertId, ...newTask });
    });
  }

  static findById(idTask, result) {
    pool.query("SELECT * FROM Task WHERE idTask = ?", idTask, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found task: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Task with the id
      result({ kind: "not_found" }, null);
    });
  }

  static getAll(result) {
    let query = "SELECT * FROM Task";

    pool.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Tasks: ", res);
      result(null, res);
    });
  }

  static updateById(idTask, updatedTask, result) {
    pool.query(
      "UPDATE Task SET \
       label = ?,\
       description = ?,\
       due_date = ?,\
       status = ?,\
       priority = ?,\
       reward = ?\
       WHERE idTask = ?",
      [
        updatedTask.label,
        updatedTask.description,
        updatedTask.due_date,
        updatedTask.status,
        updatedTask.priority,
        updatedTask.reward,
        idTask
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Task with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated task: ", { id: idTask, ...updatedTask });
        result(null, { id: idTask, ...updatedTask });
      }
    );
  }

  static remove(idTask, result) {
    pool.query("DELETE FROM Task WHERE idTask = ?", idTask, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Task with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted task with id: ", idTask);
      result(null, res);
    });
  }

  static removeAll(result) {
    pool.query("DELETE FROM Task", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} tasks`);
      result(null, res);
    });
  }
}

export default Task;
