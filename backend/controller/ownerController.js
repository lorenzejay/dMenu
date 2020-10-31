import asyncHandler from "express-async-handler";
import User from "../models/ownerModel.js";
import generateToken from "../utils/generateToken.js";

//post
const userAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      restaurantName: user.restaurantName,
      email: user.email,
      password: user.password,
      menu: user.menu,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid Email and Password");
  }
});

//now we need the ability to register users
//POST
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, restaurantName } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Cannot Register, user already exists.");
  }

  const user = await User.create({ name, email, password, restaurantName });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      restaurantName: user.restaurantName,
      email: user.email,
      password: user.password,
      menu: user.menu,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//now we need to a const for getUserProfile, which connects to a different user route: /profile
/*res.jsons the user that is authenticated which we need to find by getting that specific userID which we made 
in the middleares
*/
//GET
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      restaurantName: user.restaurantName,
      email: user.email,
      menu: user.menu,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@put
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.restaurantName = req.body.restaurantName || user.restaurantName;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.menu = req.body.menu || user.menu;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      restaurantName: updatedUser.restaurantName,
      password: updatedUser.password,
      menu: updatedUser.menu,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { userAuth, registerUser, getUserProfile, updateUserProfile };
