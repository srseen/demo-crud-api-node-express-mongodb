// read function is used to get all products from the database.
const read = async (req, res) => {
  res.send("Hello Product!");
};

// readById function is used to get a product by id from the database.
const readById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    res.send("Product Found!");
  } catch (err) {
    console.log(err);
    res.send("Product Not Found!");
    res.status(500).send("server error!");
  }
};

// create function is used to create a product in the database.
const create = async (req, res) => {
  try {
    console.log(req.body);
    res.send("Product Created!");
  } catch (err) {
    console.log(err);
    res.send("Product Not Created!");
    res.status(500).send("server error!");
  }
};

// update function is used to update a product in the database.
const update = async (req, res) => {
  try {
    console.log(req.body);
    res.send("Product Updated!");
  } catch (err) {
    console.log(err);
    res.send("Product Not Updated!");
    res.status(500).send("server error!");
  }
};

// remove function is used to remove a product from the database.
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    res.send("Product Removed!");
  } catch (err) {
    console.log(err);
    res.send("Product Not Removed!");
    res.status(500).send("server error!");
  }
};

module.exports = {
  read,
  readById,
  create,
  update,
  remove,
};
