require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connectDB");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
// import middleware
const notFound = require("./middleware/notfound");
const errorHandler = require("./middleware/error-handler");
const auth = require("./middleware/auth");
// use of middleware
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

//  routes
app.use("/api/auth", authRouter);
app.use("/api/jobs", auth, jobsRouter);
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB();
    app.listen(port, async () => {
      console.log(`server working on port: ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
