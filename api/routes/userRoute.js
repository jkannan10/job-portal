import express from "express";
import {
  appliedJob,
  applyJob,
  deleteAll,
  deleteUser,
  getUsers,
  login,
  register,
} from "../controller/userController.js";
import { verifyJWT } from "../controller/authController.js";
const route = express.Router();

route.post("/signup", register);
route.post("/login", login);
route.post("/apply/:userId/:jobId", applyJob);
route.get("/appliedJobs/:id", appliedJob);
route.get("/getUsers", verifyJWT, getUsers);
route.delete("/deleteUser/:id", verifyJWT, deleteUser);
route.delete("/deleteAll", deleteAll);
export default route;
