/*
How To Run:
cd Backend
node src/Config/seed.js

ouytput:
MongoDB Connected
Sample data inserted successfully
*/

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import userModel from "../Models/userModel.js";
import foodModel from "../Models/foodModel.js";
import contactModel from "../Models/contactModel.js";
import helpingUser from "../Models/helpingUsers.js";
import helpingHandModel from "../Models/helpingHandModel.js";

import users from "./sample-data/users.json" assert { type: "json" };
import foods from "./sample-data/foods.json" assert { type: "json" };
import contacts from "./sample-data/contacts.json" assert { type: "json" };
import helpingUsers from "./sample-data/helpingUsers.json" assert { type: "json" };
import helpingHandFoods from "./sample-data/helpingHandFoods.json" assert { type: "json" };

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Clear old data
    await userModel.deleteMany();
    await foodModel.deleteMany();
    await contactModel.deleteMany();
    await helpingUser.deleteMany();
    await helpingHandModel.deleteMany();

    // Users 
    for (let user of users) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }
    await userModel.insertMany(users);

    await foodModel.insertMany(foods);
    await contactModel.insertMany(contacts);
    await helpingUser.insertMany(helpingUsers);
    await helpingHandModel.insertMany(helpingHandFoods);

    console.log(" Sample ddata inserted successfully");
    process.exit();
  } catch (err) {
    console.error(" Seeding failedd:", err);
    process.exit(1);
  }
};

seedDB();
