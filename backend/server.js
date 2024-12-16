const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
dotenv.config();

const cors = require('cors');

const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = "passop";
const app = express();
const port = 3000;

// Use body-parser middleware correctly
app.use(bodyparser.json());
app.use(cors());

// Wrap MongoDB connection and server initialization in an async function
async function startServer() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");
    app.put("/:id", async (req, res) => {
  const { id } = req.params; // Get the ID from the URL
  const updatedPassword = req.body; // Get updated data from request body

  const db = client.db(dbName);
  const collection = db.collection("passwords");

  // Find and update the document
  const result = await collection.updateOne(
    { id }, // Match the ID
    { $set: updatedPassword } // Update fields
  );

  if (result.modifiedCount > 0) {
    res.send({ success: true, message: "Password updated successfully" });
  } else {
    res.status(404).send({ success: false, message: "Password not found" });
  }
});
app.put("/:id", async (req, res) => {
  const { id } = req.params; // Extract the document's unique ID
  const updatedData = req.body; // Extract new password details

  // Ensure `_id` is not included in the update object
  if (updatedData._id) {
    delete updatedData._id;
  }

  const db = client.db(dbName);
  const collection = db.collection("passwords");

  try {
    const result = await collection.updateOne(
      { id: id }, // Match the custom `id` field, not `_id`
      { $set: updatedData } // Update only specific fields
    );

    if (result.modifiedCount > 0) {
      res.status(200).send({ success: true, message: "Password updated successfully" });
    } else {
      res.status(404).send({ success: false, message: "Password not found" });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
});

    // Define routes after connection
    app.get("/", async (req, res) => {
      const db = client.db(dbName);
      const collection = db.collection("passwords");
      const findResult = await collection.find({}).toArray();
      res.json(findResult);
    });

    app.post("/", async (req, res) => {
      const password = req.body;
      const db = client.db(dbName);
      const collection = db.collection("passwords");
      const findResult = await collection.insertOne(password);
      res.send({ success: true, result: findResult });
    });

    app.delete("/", async (req, res) => {
      const password = req.body;
      const db = client.db(dbName);
      const collection = db.collection("passwords");
      const findResult = await collection.deleteOne(password);
      res.send({ success: true, result: findResult });
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

// Start the server
startServer();
