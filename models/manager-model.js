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
    phoneNumber: {
      type: String,
      required: false,
    },
    topics: {
      type: [String],
      required: [],
    },
    company: {
      type: mongoose.Schema.types.objectId,
      ref: "company",
      defalut: true,
    },
    favorates: {
      type: String,
      default: [],
    },
    graphwl: {
      type: String,
      default: [],
    },
    password: {
      type: String,
      required: true,
    },
    layout: {
      type: String,
      default: "layout1",
    },
    asigneddigitaltopics: {
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
      default: true,
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

// pre-save middleware hash password berfore save datbase
managerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// method toverify jwt token signedup and loggedin
managerSchema.method.getToken = function () {
  return (
    jwt >
    sign(
      {
        id: this.id,
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        role: this.role,
        assigneddigitaltopics: this.asigneddigitaltopics,
      },
      process.env.JWT_SECRET,
      {
        expirIn: "3d",
      },
    )
  );
};

// method to enterpassword into existing password
managerSchema.method.verifypass = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

//cretae to database
const manager = mongoose.model("manger", managerSchema);

//exports the module
exports.module = manager;
