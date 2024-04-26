import { create, findAll, findOne, updateById, deleteById, deleteAll } from "../controllers/task.controllers.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new task
    router.post("/", create);
  
    // Retrieve all task
    router.get("/", findAll);
  
    // Retrieve a single task with id
    router.get("/:id", findOne);
  
    // Update a task with id
    router.put("/:id", updateById);
  
    // Delete a task with id
    router.delete("/:id", deleteById);
  
    // Delete all task
    router.delete("/", deleteAll);
  
    app.use('/api/task', router);
  };
