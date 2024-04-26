import { create, findAll, findOne, updateById, deleteById, deleteAll } from "../controllers/subtask.controllers.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new subtask
    router.post("/", create);
  
    // Retrieve all subtask
    router.get("/", findAll);
  
    // Retrieve a single subtask with id
    router.get("/:id", findOne);
  
    // Update a subtask with id
    router.put("/:id", updateById);
  
    // Delete a subtask with id
    router.delete("/:id", deleteById);
  
    // Delete all subtask
    router.delete("/", deleteAll);
  
    app.use('/api/subTask', router);
  };
