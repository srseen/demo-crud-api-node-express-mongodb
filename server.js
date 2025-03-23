const express = require("express");
const { readdirSync } = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

require("dotenv").config();

// const authRouter = require("./Routes/auth");
// const productRouter = require("./Routes/product");
const app = express();
connectDB();
const port = process.env.PORT;

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Server!");
});

// app.use("/api", authRouter); // http://localhost:3000/api/auth
// app.use("/api", productRouter); // http://localhost:3000/api/product

readdirSync("./Routes").map((r) => app.use("/api", require(`./Routes/${r}`)));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
