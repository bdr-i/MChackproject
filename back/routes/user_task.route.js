import { create, findByTask, findByUser, remove } from "../controllers/user_task.controllers.js";
import { Router } from "express";
const router = Router();

export default app => {  
    // Create a new subtask
    router.post("/", create);
  
    router.get("/task/:id", findByTask);
  
    // Update a subtask with id
    router.get("/user/:id", findByUser);
  
    // Delete a subtask with id
    router.delete("/:id/:id", remove);
  
    app.use('/api/user_task', router);
  };
