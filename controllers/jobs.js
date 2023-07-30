const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  let result = Job.find(queryObject);

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const jobs = await result;
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);
  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};
const getJob = async (req, res) => {
  const { id } = req.params;
  console.log(req.user, id);
  const job = await Job.findOne({ _id: id, createdBy: req.user.userId });
  if (!job) {
    throw new BadRequestError("Job can't found");
  }
  console.log(job);
  res.status(StatusCodes.OK).json(job);
};
const createJob = async (req, res) => {
  const { company, position, jobLocation, status, jobType } = req.body;
  if (!company || !position) {
    throw new BadRequestError("Please provide company name and position");
  }
  const { userId } = req.user;
  const job = await Job.create({
    company,
    position,
    jobLocation,
    status,
    jobType,
    createdBy: userId,
  });
  console.log(job);
  res.json({ job });
};
const updateJob = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ job, msg: "Item updated" });
};
const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findOneAndDelete(
    {
      _id: id,
      createdBy: req.user.userId,
    },
    { new: true }
  );
  res.json({ job, msg: "Item removed" });
};
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
