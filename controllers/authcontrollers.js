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

// login
exports.admin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await user.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  const isMatch = await verifypass(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  const token = await user.getToken();
  res.status(200).json({
    success: true,
    token,
  });
});

//admin
exports.admin = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;
  const user = await user.findOne({ email }).select("+password");
  if (!this.admin) {
    return next(new ErrorResponse("Invalid credential", 401));
  }
  const isMatch = await verifypass(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  const token = await this.admin.getToken();
  res.status(200).json({
    success: true,
    token,
  });
});

const company = asyncHandler(async (req, res, next) => {
  const { name, email, password, label, address } = req.body;
  const company = await company.findone(name);
  if (!company) {
    return next(new ErrorResponse("Company alreday exists", 409));
  }
  const newcompany = new company({ name, email, password, label, address });
  await newcompany.save();
  res.status(200).json({
    success: true,
    data: newcompany,
  });
});

// get company
exports.getcompany = asyncHandler(async (req, res, next) => {
  const { companyId } = req.params;
  const company = await company.findById(companyId);
  if (!company) {
    return next(
      new ErrorResponse(`no found with company by id${companyId}`, 409),
    );
  }
  res.status(200).json({
    success: true,
    data: company,
  });
});

// delete company
exports.deleteCompany = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const company = await company.findById(id);
  if (!company) {
    return next(new ErrorResponse(`no comapny found with id${id}`, 404));
  }
  await company.deleteone();
  res.status(200).json({
    success: true,
    data: [],
  });
});

//managerlogin
exports.loginAsmanager = asyncHandler(async (req, res, next) => {
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

//deletemanager
exports.deletemanager = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!Manager) {
    return next(new ErrorResponse(`no manager found with id${id}`, 404));
  }
  await Manager.deleteone();
  res.status(200).json({
    suceess: true,
    data: [],
  });
});
