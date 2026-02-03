const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
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
    phonenumber: {
      type: String,
      required: false,
    },
    topics: {
      type: [String],
      default: [ture],
    },
    company: {
      type: mongoose.Schema.types.objectId,
      ref: "emaployee",
    },
    favorates: {
      type: String,
      default: [],
    },
    graphwl: {
      type: String,
      default: [],
    },
    passwords: {
      type: String,
      select: false,
      require: true,
    },
    layout: {
      type: String,
      ref: "layout1",
    },
    assigndigitalmetere: {
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
      required: true,
      default: "employee",
    },
  },
  {
    timestamps: true,
  },
);

// pre-save middleware hash password before save database
userSchema.pre("save", async function (next) {
  if (!this.ismodified("password")) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// method to verify jwt token signed and loggedin
userSchema.method.getToken = function () {
  return jwt.sign(
    {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      assigndigitalmetere: this.assigndigitalmetere,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );
};

//method to enterpassword into this.password
userSchema.method.verifypsaa = async function (enterpassword) {
  return await bcrypt.compare(this.password, enterpassword);
};

// create the model
const user = mongoose.model("user", userSchema);

//exports the module
exports.module = user;
