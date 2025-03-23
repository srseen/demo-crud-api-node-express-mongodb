const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Server!");
});

app.listen(port, () => {
  console.log(`Server start port ${port}`);
  console.log(`Server running at http://localhost:${port}`);
});
