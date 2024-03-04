import Admin from "../model/admin.js";
import Job from "../model/jobs.js";
import User from "../model/user.js";
export const getAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find({});
    res.status(200).json(admins);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findOne({ _id: id });
    if (admin == null) res.status(409).send("Conflict - User Not Found");
    const deleteAdmin = await Admin.findOneAndDelete({ _id: id });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
/* pushing job */
export const pushJob = async (adminId, jobId) => {
  try {
    // console.log(adminId + " " + jobId);
    const admin = await Admin.findOne({ _id: adminId });
    admin.jobs.push(jobId);
    // console.log(admin);
    await admin.save();
  } catch (err) {
    console.log(err);
    res.status(500).send("internal Server Error");
  }
};

/* displaying jobs posted by the admin */
export const postedJobs = async (req, res, next) => {
  try {
    const adminId = req.params.id;

    // Find jobs where the applicants array contains the user ID
    const appliedJobs = await Job.find({ postedBy: adminId });
    res.status(200).json(appliedJobs);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server");
  }
};
/* retrieving details of the applicants */

export const applicants = async (req, res, next) => {
  //const adminId = req.params.adminId;
  const jobId = req.params.jobId;
  //console.log(jobId);
  try {
    const job = await Job.findOne({ _id: jobId });
    // console.log(job);
    const applicants = job.applicants;
    //console.log(applicants);
    const details = [];
    for (let i = 0; i < applicants.length; i++) {
      let user = await User.findOne({ _id: applicants[i] });
      //console.log(user);
      details.push(user);
    }
    //console.log(details);
    res.status(200).json(details);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error ");
  }
};

/* Delete All */

export const deleteAll = async (req, res, next) => {
  const admin = await Admin.deleteMany({});
  res.status(200).json(admin);
};
