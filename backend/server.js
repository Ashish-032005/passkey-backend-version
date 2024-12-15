const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const bodyparser = require('body-parser');
dotenv.config();

const cors=require('cors')


const url=process.env.MONGO_URI
const client = new MongoClient(url);

const dbName = "passop";
const app = express();
const port = 3000;

// Use body-parser middleware correctly
app.use(bodyparser.json());
app.use(cors())
// Connect to MongoDB before starting the server
client.connect().then(() => {
  console.log("Connected to MongoDB");

  // Define routes after connection
  

  app.get("/", async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  });

  app.post("/", async (req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const findResult = await collection.insertOne(password);
    res.send({success:true, result:findResult});
  });

  app.delete("/", async (req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const findResult = await collection.deleteOne(password);
    res.send({success:true, result:findResult});
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
  });
}).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});
