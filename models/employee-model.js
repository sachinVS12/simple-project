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
      required: false,
    },
    topics: {
      type: [String],
      default: [],
    },
    company: {
      type: mongoose.Schema.Types.objectId,
      ref: "employee",
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorates: {
      type: String,
      required: [],
    },
    graphwl: {
      type: String,
      required: [],
    },
    layout: {
      type: String,
      default: "layout1",
    },
    headerone: {
      type: String,
      required: true,
    },
    headertwo: {
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
          tick: Number,
          label: String,
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
    timestamp: true,
  },
);

// pre-save middleware hash password before database
employeeSchema.pre("save", async function next() {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//method to verify jwt token signedup and loggedin
employeeSchema.method.getToken = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      phonenumber: this.phonenumber,
      assigneddigitalmeters: this.assigneddigitalmeters,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );
};

// method to enetrpassword into existing password
employeeSchema.method.verifypass = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

// create model
const employee = mongoose.model("employee", employeeSchema);

// exports module
exports.moduel = employee;
