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

// create company
exports.createcompany = asyncHandler(async (req, res, next) => {
  const { name, email, phonenumber, address, label } = req.body;
  const company = await company.findOne({ name });
  if (!company) {
    return next(new ErrorResponse("company already Exists", 409));
  }
  const newCompany = new company({ name, email, phonenumber, address, label });
  await newCompany.save();
  res.status(201).json({
    success: true,
    data: newCompany,
  });
});

// getsinglecompany
exports.getsinglecompany = asyncHandler(async (req, res, next) => {
  const { companyId } = req.params;
  const company = await company.findById(companyId);
  if (!company) {
    return next(new ErrorResponse(`no company fond by id${companyId}`, 404));
  }
  res.status(201).json({
    success: true,
    data: company,
  });
});

//deletecompany
exports.deletecomapny = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const company = await company.findById(id);
  if (!company) {
    return next(new ErrorResponse(`no company found with id ${id}`, 404));
  }
  await company.deleteone();
  res.status(200).json({
    success: true,
    data: [],
  });
});

//manager
exports.loginmanager = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Manager.findOne({ email })
    .select("+password")
    .populate("company");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  const isMatch = await user.verifypass(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  const token = await user.getToken();
  res.status(200).json({
    success: true,
    user,
    token,
  });
});

//getsinglemanager
exports.getsinglemanager = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const manager = await manager.findById(id).populate("company");
  if (!manager) {
    return next(new ErrorResponse(`no company found with id ${id}`, 409));
  }
  res.status(200).json({
    success: true,
    data: manager,
  });
});
