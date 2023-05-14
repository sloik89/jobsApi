const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const getAllJobs = async (req, res) => {
  console.log(req.user.userId);
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json(jobs);
};
const getJob = async (req, res) => {
  const { id } = req.params;
  console.log(req.user);
  const job = await Job.find({ _id: id, createdAt: req.user.userId });
  if (!job) {
    throw new BadRequestError("Job can't found");
  }

  res.status(StatusCodes.OK).json(job);
};
const createJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError("Please provide company name and position");
  }
  const { userId } = req.user;
  const job = await Job.create({ company, position, createdBy: userId });
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
  const job = await Job.findOneAndDelete({
    _id: id,
    createdBy: req.user.userId,
  });
  res.json({ job, msg: "Item removed" });
};
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
