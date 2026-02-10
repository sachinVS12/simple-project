const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schema(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true,
    },
    employee: {
      type: mongoose / Schema.Types.ObjectId,
      ref: "manager",
      required: false,
    },
    password: {
      type: String,
      required: true,
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
    headersone: {
      type: String,
      required: [],
    },
    headerstwo: {
      type: String,
      required: true,
    },
    assigneddigitalmeters: {
      type: [
        {
          topics: String,
          metertype: String,
          minvalue: Number,
          maxvalue: Number,
          tick: String,
          label: Number,
        },
      ],
      default: [],
    },
    role: {
      type: String,
      default: "employee",
    },
  },
  {
    timestamps: true,
  },
);

// pre-save middleware hash password before save database
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// method to verify token jwt in signedup and loggedin
employeeSchema.method.getToken = function () {
  return (
    {
      id: this._id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      assigneddigitalmeters: this.assigneddigitalmeters,
    },
    process.env.JWT_SECRET,
    {
      ExpireIn: "3d",
    }
  );
};

// method to enterpassword into existing password
employeeSchema.method.verifypass = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

//create a model
const employee = mongoose.model("employee", employeeSchema);

//exports th module
module.exports = employee;
