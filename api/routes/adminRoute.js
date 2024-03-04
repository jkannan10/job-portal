import express from "express";
import {
  applicants,
  deleteAdmin,
  deleteAll,
  getAdmins,
  postedJobs,
} from "../controller/adminController.js";
import { verifyAdmin } from "../controller/authController.js";
const route = express.Router();

route.get("/getAdmins", verifyAdmin, getAdmins);
route.get("/postedJobs/:id", postedJobs);
route.get("/applicantsJob/:jobId", applicants);
route.delete("/deleteAdmin/:id", verifyAdmin, deleteAdmin);
// route.delete("/deleteAll", deleteAll);
export default route;
