import { create, findAll, findOne, deleteById, deleteAll, updateById } from "../controllers/user.controllers.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new user
    router.post("/", create);
  
    // Retrieve all user
    router.get("/", findAll);
  
    // Retrieve a single user with id
    router.get("/:id", findOne);
  
    // Update a user with id
    router.put("/:id", updateById);
  
    // Delete a user with id
    router.delete("/:id", deleteById);
  
    // Delete all user
    router.delete("/", deleteAll);
  
    app.use('/api/user', router);
  };
