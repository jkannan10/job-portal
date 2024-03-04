import express from "express";
import {
  deleteAll,
  deleteJob,
  getJobs,
  getOneJob,
  postJobs,
  searchByrequirements,
  updateJob,
} from "../controller/jobController.js";
import { verifyAdmin, verifyJWT } from "../controller/authController.js";
const route = express.Router();

route.get("/getJobs", getJobs);
route.get("/getJob/:id", getOneJob);
route.get("/desiredJob/:location/:salary", verifyJWT, searchByrequirements);
route.post("/postJob/:id", postJobs);
route.put("/updateJob/:id", verifyAdmin, updateJob);
route.delete("/deletejob/:id", deleteJob);
route.delete("/delete", deleteAll);
export default route;
