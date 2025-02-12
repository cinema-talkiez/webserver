require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ Import CORS

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS for all requests
app.use(cors());

// ✅ (Optional) Allow specific origins only
// app.use(cors({ origin: "https://your-frontend.netlify.app" }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ MongoDB Connection Error:', err));

// ✅ API route to fetch the URL
app.get('/get-url', async (req, res) => {
    try {
        const urlData = { url: "https://example.com" }; // Replace with MongoDB data if needed
        res.json(urlData);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
