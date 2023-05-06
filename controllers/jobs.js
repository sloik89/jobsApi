const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const getAllJobs = async (req, res) => {
  console.log(req.user.userId);
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json(jobs);
};
const getJob = async (req, res) => {
  res.send("get job");
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
  res.send("update job");
};
const deleteJob = async (req, res) => {
  res.send("delete job");
};
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
