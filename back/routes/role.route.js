import { create, findAll, findOne, update, deleteById, deleteAll } from "../controllers/role.controllers.js";
import { Router } from "express";
const router = Router();

export default app => {  
 
    // Create a new role
    router.post("/", create);
  
    // Retrieve all roles
    router.get("/", findAll);
  
    // Retrieve a single role with id
    router.get("/:id", findOne);
  
    // Update a role with id
    router.put("/:id", update);
  
    // Delete a role with id
    router.delete("/:id", deleteById);
  
    // Delete all role
    router.delete("/", deleteAll);
  
    app.use('/api/role', router);
  };
