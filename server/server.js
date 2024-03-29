import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import hospitalRouter from "./Routes/hospitalRouter.js";
import authRouter from "./Routes/authRouter.js";
import userRouter from "./Routes/userRouter.js";
import doctorRouter from "./Routes/doctorRouter.js";
import bookingRouter from "./Routes/bookingRoute.js";
import absentRoutes from "./Routes/absentRoute.js";
import pdfRoutes from "./Routes/pdfRoute.js";
import path from "path";

import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

const app = express();

// Before making the request

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

// app.post('/api/v1/create-pdf', );

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/server/templates/result.pdf`);
});

app.use("/api/v1", pdfRoutes);
app.use("/api/v1", absentRoutes);
app.use("/api/v1/bookings", authenticateUser, bookingRouter);
app.use("/api/v1/doctors", authenticateUser, doctorRouter);
app.use("/api/v1/hospitals", authenticateUser, hospitalRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_CLIENT_URI);
  console.log("Completed: (1/2) Successfully Connected to the database.....");
  setTimeout(() => {
    console.log("Establising Server now...");
  }, 1000);
  // const express = require("express");
  // const path = require("path");

  // const app = express();

  // if (process.env.NODE_ENV === "production") {
  //   // Construct the absolute path to the "client/build" directory
  //   const clientBuildPath = path.join(__dirname, "client", "build");

  //   // Use express.static middleware to serve static files from the "client/build" directory
  //   app.use(express.static(clientBuildPath));

  //   // Add a route to handle requests to your React app's index.html
  //   app.get("*", (req, res) => {
  //     res.sendFile(path.join(clientBuildPath, "index.html"));
  //   });
  // }

  setTimeout(() => {
    app.listen(port, () => {
      console.log(`Completed: (2/2) Server running on PORT ${port}...`);
    });
  }, 2000);
} catch (error) {
  console.log(error);
  process.exit(1);
}
