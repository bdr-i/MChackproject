import pool from "../config/db.js";

class Subtask {
  constructor(subtask) {
    this.idTask = subtask.idTask;
    this.label = subtask.label;
    this.due_date = subtask.due_date;
    this.status = subtask.status;
    this.reward = subtask.reward;
    this.idTask = subtask.idTask;
  }

  static create(newSubtask, result) {
    pool.query("INSERT INTO Subtask SET ?", newSubtask, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created subtask: ", { id: res.insertId, ...newSubtask });
      result(null, { id: res.insertId, ...newSubtask });
    });
  }

  static findById(idSubtask, result) {
    pool.query("SELECT * FROM Subtask WHERE idSubtask = ?", idSubtask, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found subtask: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Subtask with the id
      result({ kind: "not_found" }, null);
    });
  }

  static getAll(result) {
    let query = "SELECT * FROM Subtask";
    
    pool.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Subtasks: ", res);
      result(null, res);
    });
  }

  static remove(idSubtask, result) {
    pool.query("DELETE FROM Subtask WHERE idSubtask = ?", idSubtask, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Subtask with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted subtask with id: ", idSubtask);
      result(null, res);
    });
  }

  static updateById(idSubTask, subTask, result) {
    pool.query(
      "UPDATE SubTask SET \
       label = ?,\
       due_date = ?,\
       status = ?,\
       reward = ?,\
       idTask = ?,\
       WHERE idSubTask = ?",
      [
        subTask.label,
        subTask.due_date,
        subTask.status,
        subTask.reward,
        subTask.idTask,
        idSubTask
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

        console.log("updated subTask: ", { id: idSubTask, ...subTask });
        result(null, { id: idSubTask, ...subTask });
      }
    );
  }

  static removeAll(result) {
    pool.query("DELETE FROM Subtask", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} subtasks`);
      result(null, res);
    });
  }
}

export default Subtask;
