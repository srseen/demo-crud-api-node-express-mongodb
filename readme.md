# Node.js + Express.js สำหรับ API CRUD

## สิ่งที่ต้องติดตั้ง

- node
- mongodb

---

## ติดตั้ง Library ที่ folder server

```jsx
npm init -y
```

```jsx
npm install express
```

```jsx
npm install nodemon
```

> เพิ่มคำสั่ง start ที่ไฟล์ package.json เพื่อง่ายต่อการรันคำสั่งของ nodemon
> 
> 
> ```
> "scripts": {
>     "start": "nodemon server.js"
>   },
> ```
> 

---

## การสร้าง Routes

1. สร้าง routes (get post put delete) ตรงๆ ใน server.js เช่น

```jsx
app.get("/", (req, res) => {
  res.send("Hello Server!");
});
```

2. ถ้าต้องการแยก routes ใน folder ใหม่ เช่น folder Routes

```jsx
const router = express.Router();
```

```jsx
// ประกอบด้วย 3 ส่วน
// 1.ส่วนที่ใช้สำหรับประกาศตัวแปรและ import
const express = require("express");
const router = express.Router();

// 2.ส่วนที่สร้าง routes
router.get("/auth", (req, res) => {
  res.send("Hello Auth!");
});

// 3.ส่วนที่ใช้สำหรับ export
module.exports = router;
```

ตอนเรียกใช้งาน ให้ไปที่ folder server.js

```jsx
const productRouter = require("./Routes/product");
const authRouter = require("./Routes/auth");
```

```jsx
app.use("/api", authRouter, productRouter);
```

ตัวอย่าง Routes สำหรับ CRUD

```jsx
const Product = require("../models/product.model");

// read function is used to get all products from the database.
const read = async (req, res) => {
  try {
    const producted = await Product.find({}).exec();
    res.send(producted);
  } catch (err) {
    console.log(err);
    res.send("Product Not Found!");
    res.status(500).send("server error!");
  }
};

// readById function is used to get a product by id from the database.
const readById = async (req, res) => {
  try {
    const id = req.params.id;
    const producted = await Product.findOne({ _id: id }).exec();
    res.send(producted);
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
    const producted = await Product(req.body).save();
    res.send(producted);
  } catch (err) {
    console.log(err);
    res.send("Product Not Created!");
    res.status(500).send("server error!");
  }
};

// update function is used to update a product in the database.
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    }).exec();
    res.send(updated);
  } catch (err) {
    console.log(err);
    res.send("Product Not Updated!");
    res.status(500).send("server error!");
  }
};

// remove function is used to remove a product from the database.
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const removed = await Product.findOneAndDelete({ _id: id }).exec();
    res.send(removed);
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

```

3. การใช้โดยใช้ lib ของ node.js ที่ชื่อ fs

```jsx
const { readdirSync } = require("fs");
```

```jsx
readdirSync("./Routes")
	.map((r) => app.use("/api", require(`./Routes/${r}`)));

```

### ref:

- [https://expressjs.com/en/starter/basic-routing.html](https://expressjs.com/en/starter/basic-routing.html)
- [https://expressjs.com/en/5x/api.html](https://expressjs.com/en/5x/api.html)
- [https://expressjs.com/en/starter/examples.html](https://expressjs.com/en/starter/examples.html)

---

## ติดตั้ง Middleware

### 1.morgan

```jsx
npm i morgan
```

```jsx
const morgan = require("morgan");

app.use(morgan("dev"));
```

มี code status ที่ terminal

```jsx
GET /api/product 304 2.648 ms - -
```

### 2.body-parser

```jsx
npm i body-parser
```

### 3.cors

```jsx
npm i cors
```

---

## ติดตั้ง mongoose ต่อ database กับ mongodb

### 1.dotenv

```jsx
npm i dotenv
```

เปลี่ยน env.example เป็น .env

```
PORT=
MONGODB_URI=
```

### 2.mongoose

```jsx
npm i mongoose
```

```jsx
// ไฟล์ config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```