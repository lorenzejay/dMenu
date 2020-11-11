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
// const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       restaurantName: user.restaurantName,
//       email: user.email,
//       menu: user.menu,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// //@put
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if (user) {
//     user.name = req.body.name || user.name;
//     user.restaurantName = req.body.restaurantName || user.restaurantName;
//     if (req.body.password) {
//       user.password = req.body.password;
//     }
//     user.menu = req.body.menu || user.menu;

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       restaurantName: updatedUser.restaurantName,
//       password: updatedUser.password,
//       menu: updatedUser.menu,
//       token: generateToken(updatedUser._id),
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// const getUserMenu = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       restaurantName: user.restaurantName,
//       email: user.email,
//       menu: user.menu,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// const removeMenuItem = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if (user) {
//     await User.update({ _id: user._id }, { $unset: { "users.menu": req.body.menuItem } });

//     await User.update({ _id: user._id }, { $pull: { menu: null } });
//   }
//   res.json(user.menu);
// });

// const updateMenu = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if (user) {
//     const updatedMenu = await User.update(
//       { _id: user._id },
//       {
//         $push: {
//           menu: {
//             name: req.body.name,
//             image: req.body.image,
//             description: req.body.description,
//             category: req.body.category,
//             price: req.body.price,
//             calories: req.body.calories,
//           },
//         },
//       }
//     );

//     res.status(200).json({ menu: updatedMenu.menu });
//   } else {
//     res.status(404);
//     throw new Error("Unable to update menu");
//   }
// });

// get a users menu
// GET /:id/menu
// PRIVATE
export const getUserMenu = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user.menu);
  } else {
    res.status(400);
    throw new Error("User not Found");
  }
});

// add users menu
// POST /:id/menu
// PRIVATE
export const createUserMenu = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { name, image, description, category, price, calories } = req.body;
  if (user) {
    const newMenuItem = { name, image, description, category, price, calories };

    user.menu.push(newMenuItem);

    const newItem = await user.save();
    res.status(201).json(newItem);
  } else {
    res.status(400);
    throw new Error("User not Found");
  }
});
// update users menu item
// PUT /menu/:id
// PRIVATE
export const updateMenuItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { name, image, description, category, price, calories } = req.body;
  if (user) {
    //find the selected menu item id
    const menuItem = user.menu.id(req.params.id);
    (menuItem.name = name || menuItem.name),
      (menuItem.image = image || menuItem.image),
      (menuItem.description = description || menuItem.description),
      (menuItem.category = category || menuItem.category);
    (menuItem.price = price || menuItem.price), (menuItem.calories = calories || menuItem.calories);

    await user.save();
    res.json(menuItem);
  } else {
    res.status(400);
    throw new Error("Item not Found");
  }
});

export { userAuth, registerUser };
