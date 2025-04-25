import mongoose from "mongoose";

const treeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  favoritedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Add 2dsphere index for geolocation queries
treeSchema.index({ location: "2dsphere" });

export const Tree = mongoose.model("Tree", treeSchema);
