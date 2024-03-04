import mongoose from "mongoose";
import Job from "./jobs.js";
const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  jobs: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
});

export default mongoose.model("Admin", adminSchema);
