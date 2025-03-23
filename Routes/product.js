const express = require("express");
const router = express.Router();

// get all products
router.get("/product", (req, res) => {
  res.send("Hello Product!");
});

// get product by id
router.get("/product/:id", (req, res) => {
  console.log(req.params.id);
  res.send("Hello Product!");
});

// create product
router.post("/product", (req, res) => {
  console.log(req.body);
  res.send("Product Created!");
});

// update product
router.put("/product/:id", (req, res) => {
  console.log(req.body);
  res.send("Product Updated!");
});

// delete product
router.delete("/product/:id", (req, res) => {
  console.log(req.body);
  res.send("Product Deleted!");
});

module.exports = router;
