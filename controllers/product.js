const read = async (req, res) => {
  res.send("Hello Product!");
};
const readById = async (req, res) => {
  console.log(req.params.id);
  res.send("Hello Product!");
};
const create = async (req, res) => {
  console.log(req.body);
  res.send("Product Created!");
};
const update = async (req, res) => {
  console.log(req.body);
  res.send("Product Updated!");
};
const remove = async (req, res) => {
  console.log(req.body);
  res.send("Product Deleted!");
};
module.exports = {
  read,
  readById,
  create,
  update,
  remove,
};
