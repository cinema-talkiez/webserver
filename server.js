require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // To parse JSON request body
app.use(cors());

// MongoDB Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Define Schema and Model
const WebViewSchema = new mongoose.Schema({
  url: { type: String, required: true },
});
const WebView = mongoose.model("WebView", WebViewSchema);

// Route to get the current WebView URL
app.get("/get-url", async (req, res) => {
  try {
    const data = await WebView.findOne();
    if (data) {
      res.json({ url: data.url });
    } else {
      res.status(404).json({ message: "No URL found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Route to update the WebView URL
app.post("/update-url", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    let data = await WebView.findOne();
    if (data) {
      data.url = url;
    } else {
      data = new WebView({ url });
    }
    await data.save();

    res.json({ message: "URL updated successfully", url: data.url });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
