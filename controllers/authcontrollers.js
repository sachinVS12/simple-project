const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await user.findOne({ email }).selected("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  const isMatch = await user.verifypass(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  const token = await user.getToken();
  res.status(200).json({
    success: true,
    token,
  });
});

// admin
exports.admin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const admin = await this.admin.findOne({ email }).selected("+password");
  if (!admin) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  const isMatch = await admin.verifypass(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  const token = await admin.getToken();
  res.status(201).json({
    success: true,
    token,
  });
});
