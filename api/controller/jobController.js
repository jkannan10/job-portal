import jobs from "../model/jobs.js";
import User from "../model/user.js";
import Admin from "../model/admin.js";
import { pushJob } from "./adminController.js";

/* Add Jobs */
export const postJobs = async (req, res, next) => {
  try {
    const { companyName, role, salary, location } = req.body;
    const newJob = new jobs({ companyName, role: role, salary, location });
    newJob.postedBy = req.params.id;
    const saveJobs = await newJob.save();
    pushJob(req.params.id, saveJobs._id);
    res.status(200).json({ id: saveJobs._id });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error");
  }
};

/* Delete Job */
export const deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const deleteJob = await jobs.findByIdAndDelete(req.params.id);
    await User.updateMany({ jobs: jobId }, { $pull: { jobs: jobId } });

    await Admin.updateMany({ jobs: jobId }, { $pull: { jobs: jobId } });

    if (deleteJob !== null) res.status(200).json(deleteJob);
    else res.status(404).send("Job Not Found");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error");
  }
};

/* Get Jobs */

export const getJobs = async (req, res, next) => {
  try {
    /* Array of Objects */
    const allJobs = await jobs.find({});
    res.status(200).json(allJobs);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error");
  }
};

/* Get A specific Job */

export const getOneJob = async (req, res, next) => {
  try {
    const job = await jobs.findById(req.params.id);
    if (job !== null) res.status(200).json(job);
    else res.status(404).send("Job Not Found");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error");
  }
};
/* Update a Job */
export const updateJob = async (req, res, next) => {
  try {
    const updateJobs = await jobs.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateJobs);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error");
  }
};

/* By location and Salary */

export const searchByrequirements = async (req, res, next) => {
  let location = req.params.location;
  let salary = req.params.salary;
  if (location == null || salary == null)
    res.status(404).send("Invalid Location or Salary");
  try {
    const Alljobs = await jobs.find({ location: location, salary: salary });
    res.status(200).json(Alljobs);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error");
  }
};

/* delete All */
export const deleteAll = async (req, res, next) => {
  await jobs.deleteMany({});
};

/* Applied Job */
