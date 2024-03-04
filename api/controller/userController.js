import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import Job from "../model/jobs.js";
import Admin from "../model/admin.js";
/* Register */
export const register = async (req, res, next) => {
  try {
    const { username, email, password, userType } = req.body;
    // console.log(req.body);
    const exists = await User.findOne({ email: email });
    const adminExits = await Admin.findOne({ email: email });
    if (exists != null || adminExits != null)
      res.status(409).send("conflict - user already exists");
    const hashedPWD = await bcrypt.hash(password, 10);

    /* Save the details in User DB if it is user */
    if (userType == "user") {
      const newUser = new User({ name: username, email, password: hashedPWD });
      await newUser.save();
      res.status(200).send("new User registered Successfully");
    } else {
      /* Save the details in Admin DB if it is Admin */
      const newAdmin = new Admin({
        name: username,
        email,
        password: hashedPWD,
        isAdmin: true,
      });
      await newAdmin.save();
      res.status(200).json(newAdmin);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
/* Login */
export const login = async (req, res, next) => {
  let active = "";
  try {
    const { userType } = req.body;
    const { email, password } = req.body;

    /* Checking whether the User exists */
    if (userType == "user") {
      const user = await User.findOne({ email: email });
      active = user;
      if (user == null) {
        res.status(404).send("Conflict - User Not Found");
      }
      /* Checking the password is valid */
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) res.status(400).send("Invalid Password");
    } else {
      /* checking whether the admin exists */
      const admin = await Admin.findOne({ email: email });
      active = admin;
      if (admin == null) {
        res.status(404).send("Conflict - User Not Found");
      }
      /* Checking the password is valid */
      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) res.status(400).send("Invalid Password");
    }
    const accessToken = jwt.sign(
      { id: active._id, email: active.email, userType: active.userType },
      process.env.ACCESS_TOKEN
    );
    res
      .cookie("access_token", accessToken, { httpOnly: true })
      .status(201)
      .json({ id: active._id });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
/* get All the Users */
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error");
  }
};

/* Delete User By ID */
export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ _id: id });
    if (user == null) res.status(209).send("Conflict - User Not Found ");
    else {
      const deleteUser = await User.findOneAndDelete({ _id: id });
      res.status(200).json(deleteUser);
    }
  } catch (err) {
    console.log(err);
  }
};

/* Apply for a Job */

export const applyJob = async (req, res, next) => {
  const userId = req.params.userId;
  const jobId = req.params.jobId;
  try {
    const user = await User.findOne({ _id: userId });
    const job = await Job.findOne({ _id: jobId });
    job.applicants.push(user);
    user.jobs.push(job);
    await job.save();
    await user.save();
    // console.log(user);
    // console.log(job);
    res.status(200).send("Applied Succesfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

/* applied jobs by a user */
export const appliedJob = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find jobs where the applicants array contains the user ID
    const appliedJobs = await Job.find({ applicants: { $in: [userId] } });
    res.status(200).json(appliedJobs);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server");
  }
};
export const deleteAll = async (req, res, next) => {
  const user = await User.deleteMany({});
  res.status(200).json(user);
};
