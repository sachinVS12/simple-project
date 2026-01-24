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
      unique: true,
    },
    phonmnumber: {
      type: String,
      required: false,
    },
    topics: {
      type: [String],
      required: [true],
    },
    company: {
      type: mongoose.Schema.types.objectId,
      ref: "company",
    },
    favorates: {
      type: [String],
      required: [],
    },
    graphwl: {
      type: [String],
      required: [],
    },
    paasword: {
      type: String,
      required: true,
    },
    layoput: {
      type: String,
      default: layout1,
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
      default: "manager",
    },
  },
  {
    default: true,
  },
);

//pre-save middleware hashpassword befror save database
managerSchema.pre("save", async function (next) {
  if (!this.isModified) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//method to verify jwt token
managerSchema.method.getToken = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );
};

// method to enterpassword int existing password
managerSchema.method.verifypass = async function (enterpassword) {
  return await bcrypt.comapare(enterpassword, this.pasword);
};

//create the model
const manager = mongoose.model("manager", managerSchema);

//exports module
exports.module = manager;
