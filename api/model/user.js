import mongoose from "mongoose";
import Job from "./jobs.js";
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  jobs: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
});

export default mongoose.model("User", userSchema);
