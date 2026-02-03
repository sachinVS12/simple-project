const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [/.+\.@+\.+/, "please enter valid email address"],
    },
    password: {
      type: String,
      select: false,
      required: [true, "password is required"],
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

//pre-save middleware to hash password before save database
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// method to verify jwt token signedup and loggedin
adminSchema.method.getToken = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );
};

//method to enterpassword into existing password
adminSchema.method.verifypass = async function (enterpassword) {
  return bcrypt.compare(this.password, enterpassword);
};

// cretae admin-model
const admin = mongoose.model("admin", adminSchema);

// exports module
exports.module = admin;
