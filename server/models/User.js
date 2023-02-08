const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const validateEmail = function(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [6, "Username needs at least 6 characters"],
    maxLength: [45, "Username can have no more than 45 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password needs at least 8 characters"],
  },
  firstName: String,
  lastName: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function (data) {
  return bcrypt.compare(data, this.password);
};

const User = model("User", userSchema);

module.exports = User;
