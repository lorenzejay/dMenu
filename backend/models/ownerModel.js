import mongoose from "mongoose";
import bcrypt from "bcrypt";

const menuItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  calories: { type: Number, default: 0 },
});

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  restaurantName: { type: String, required: true },
  menu: [menuItemSchema],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

//used in the ownerController
userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//hashes password when we register or modify the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);

export default User;
