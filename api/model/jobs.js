import mongoose from "mongoose";
import Admin from "./admin.js";
import User from "./user.js";
const jobSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  applicants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
});
export default mongoose.model("Jobs", jobSchema);
