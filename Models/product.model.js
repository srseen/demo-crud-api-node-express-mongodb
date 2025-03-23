const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number, default: 0 },
    description: { type: String, default: "" },
  },
  //   timestamps: true will give us createdAt and updatedAt fields
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
