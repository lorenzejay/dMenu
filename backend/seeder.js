import dotenv from "dotenv";
import colors from "colors";
import Owner from "./models/ownerModel.js";
import connectDB from "./config/db.js";
import users from "./data/users.js";

dotenv.config();
connectDB();

//configuring the db for the first time
const importData = async () => {
  try {
    await Owner.deleteMany();

    await Owner.insertMany(users);
    console.log(`Data Imported`.green.inverse);
    process.exit();
  } catch (err) {
    console.log(`${err}`.red.inverse);
    process.exit(1); // exits with failure
  }
};

//config functions
const destroyData = async () => {
  try {
    await Owner.deleteMany();
    console.log("Data Destroyed".red.inverse);
  } catch (err) {
    console.log(`${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "d") {
  destroyData();
} else {
  importData();
}
