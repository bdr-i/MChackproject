import express from "express"
import cors from "cors"
import dotenv from 'dotenv';

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Bienvenue sur MCHACK")
})

import userRoute from "./routes/user.route.js"
userRoute(app);

import roleRoute from "./routes/role.route.js"
roleRoute(app);

import subTaskRoute from "./routes/subTask.route.js";
subTaskRoute(app);

import taskRoute from "./routes/task.route.js";
taskRoute(app);

import user_taskRoute from "./routes/user_task.route.js";
user_taskRoute(app);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });