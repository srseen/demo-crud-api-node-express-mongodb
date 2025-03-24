# Node.js + Express.js สำหรับ API CRUD

## การ clone เพื่อใช้งาน

```jsx
git clone https://github.com/srseen/demo-crud-api-node-express-mongodb.git
```

```jsx
npm install
```

---

## สิ่งที่ต้องติดตั้ง

- node
- mongodb

---

## ติดตั้ง Library

```jsx
npm init -y
```

- คำสั่งที่ใช้สร้างไฟล์ package.json เป็นไฟล์ที่ใช้เก็บข้อมูลเกี่ยวกับโปรเจกต์ Node.js

```jsx
npm install express
```

- express เป็น web framework สำหรับ Node.js ที่ช่วยให้การพัฒนาเว็บแอปและ API มีเครื่องมือที่ช่วยจัดการ routing, middleware, request, response และฟีเจอร์อื่นๆ ที่เกี่ยวข้องกับเซิร์ฟเวอร์ HTTP

```jsx
npm install nodemon
```

- nodemon เป็นเครื่องมือที่ช่วยให้ Node.js รีสตาร์ทเซิร์ฟเวอร์อัตโนมัติ เมื่อมีการเปลี่ยนแปลงโค้ดในไฟล์ โดยไม่ต้องรันคำสั่ง node server.js ใหม่เองทุกครั้ง
  > เพิ่มคำสั่ง start ที่ไฟล์ package.json เพื่อง่ายต่อการรันคำสั่งของ nodemon
  >
  > ```
  > "scripts": {
  >     "start": "nodemon server.js"
  >   },
  > ```

---

## การสร้าง Routes

### 1. สร้าง routes (get post put delete) ตรงๆ ใน server.js เช่น

```jsx
app.get("/", (req, res) => {
  res.send("Hello Server!");
});
```

### 2. ถ้าต้องการแยก routes ใน folder ใหม่ เช่น folder Routes

```jsx
const router = express.Router();
```

- โมดูลจัดการเส้นทาง (Routing Module) ของ Express ที่ช่วยแยกเส้นทาง (routes) ออกจากไฟล์หลัก (server.js ) ทำให้โค้ดสะอาดและจัดการได้ง่ายขึ้น

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

### 3. การเรียกใช้ routes โดยใช้ lib ของ node.js ที่ชื่อ fs

```jsx
// import
const { readdirSync } = require("fs");

// เรียกใช้งาน โดยจะ map ที่ ไฟล์ที่อยู่ใน folder Routes
readdirSync("./Routes").map((r) => app.use("/api", require(`./Routes/${r}`)));
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

- Morgan เป็น middleware สำหรับ logging (บันทึกข้อมูล request) ใน Express.js ช่วยให้ดูรายละเอียดของ HTTP requests ได้ง่ายขึ้น เช่น method, URL, status code, response time เป็นต้น

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

- body-parser เป็น middleware ใน Express.js ที่ใช้สำหรับ แปลงข้อมูลจาก HTTP request body ให้อยู่ในรูปแบบที่ใช้งานได้ เช่น JSON หรือ URL-encoded data  
  ปัจจุบัน Express.js เวอร์ชัน 4.16 ขึ้นไปมี body-parser ในตัวแล้ว ผ่าน express.json() และ express.urlencoded()

### 3.cors

```jsx
npm i cors
```

- CORS (Cross-Origin Resource Sharing) เป็นกลไกความปลอดภัยของเว็บเบราว์เซอร์ที่ช่วยให้เซิร์ฟเวอร์กำหนดสิทธิ์ว่าคลายแอปพลิเคชันจาก โดเมนอื่น (Cross-Origin) สามารถเข้าถึง API หรือทรัพยากรของเซิร์ฟเวอร์ได้หรือไม่

---

## ติดตั้ง mongoose ต่อ database กับ mongodb

### 1.dotenv

```jsx
npm i dotenv
```

- dotenv เป็นแพ็กเกจที่ใช้ โหลดค่าตัวแปรสภาพแวดล้อม (Environment Variables) จากไฟล์ .env เข้าไปใน process.env ใน Node.js

เปลี่ยน env.example เป็น .env

```
PORT=
MONGODB_URI=
```

### 2.mongoose

```jsx
npm i mongoose
```

- Mongoose เป็น ODM (Object Data Modeling) library สำหรับ MongoDB ที่ใช้ใน Node.js ช่วยให้เราสามารถจัดการ MongoDB database ได้ง่ายขึ้น โดยใช้ Schema และ Model

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
