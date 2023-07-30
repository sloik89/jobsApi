require("dotenv").config();
const mockData = require("./MOCK_DATA.json");
const Job = require("./models/Job");
const connectDB = require("./db/connectDB");
const start = async () => {
  try {
    await connectDB();
    await Job.create(mockData);
    console.log("Success !!!");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
start();
