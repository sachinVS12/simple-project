const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const managerSchema = new mongoose.Schema(
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
      required: [true],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
    },
    favorates: {
      type: String,
      required: [],
    },
    graphwl: {
      type: String,
      required: [],
    },
    password: {
      type: String,
      requoired: true,
    },
    layout: {
      type: String,
      default: "layout1",
    },
    digitalmeters: {
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
    timestamps: true,
  },
);

//pre-save middleware hash password to before database
managerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//method to verify jwt token signedup and loggedin
managerSchema.method.getToken = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      assigneddigitalmeters: this.assigneddigitalmeters,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );
};

//method to enetrpassword into existing password
managerSchema.method.verifytoken = async function (enetrpassword) {
  return await bcrypt.compare(this.password, enetrpassword);
};

//create the manager model
const manager = mongoose.model("manager", managerSchema);

//exports the module
exports.moduel = manager;
