import mongoose from "mongoose";
import { Tree } from "../models/Tree.js";
import { User } from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

async function seedTrees() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost/fruittrail"
    );

    // Optional: get a sample user to assign as tree owner
    const user = await User.findOne();

    const trees = [
      {
        name: "Apple Tree",
        description: "Sweet red apples in fall.",
        image: "https://example.com/apple.jpg",
        location: {
          type: "Point",
          coordinates: [-111.891, 40.7608],
        },
        addedBy: user?._id,
      },
      {
        name: "Plum Tree",
        description: "Ripe plums in summer!",
        image: "https://example.com/plum.jpg",
        location: {
          type: "Point",
          coordinates: [-111.8888, 40.7632],
        },
        addedBy: user?._id,
      },
    ];

    await Tree.deleteMany(); // clear previous data
    await Tree.insertMany(trees);

    console.log("🌳 Tree data seeded!");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seedTrees();
