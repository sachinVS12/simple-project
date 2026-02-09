const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const empolyee = new empolyee.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    topics: {
      type: [String],
      required: [true],
    },
    company: {
      type: company.Schema.Types.ObjectId,
      ref: "company",
    },
    empolyee: {
      type: company.Schema.Types.ObjectId,
      ref: "manager",
    },
    password: {
      type: String,
      required: true,
    },
    topics: {
      type: String,
      required: [true],
    },
    favorates: {
      type: String,
      default: [],
    },
    graphwl: {
      type: String,
      default: [],
    },
    layout: {
      type: String,
      default: "layout1",
    },
    assigndigitalmeters: {
      type: [
        {
          topics: String,
          metertype: String,
          minvalue: Number,
          maxvalue: Number,
          tick: Number,
          label: String,
        },
      ],
      default: true,
    },
    role: {
      type: String,
      default: "employee",
    },
  },
  {
    default: true,
  },
);

// pre-save middleware  to hash password before save database
empolyeeSchema.pre("save", async function (next) {
  if (!this.ismodified("password")) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// method to verify jwt token signedup and loggedin
empolyeeSchema.method.verifytoken = function () {
  return (
    {
      id: this._id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      assigndigitalmeters: this.assigndigitalmeters,
    },
    process.env.JWT_SECRET,
    {
      ExpireIn: "3d",
    }
  );
};
