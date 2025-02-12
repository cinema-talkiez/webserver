require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ MongoDB Connection Error:', err));

// Define the schema
const UrlSchema = new mongoose.Schema({ url: String });
const Url = mongoose.model('Url', UrlSchema);

// ✅ API to fetch URL from MongoDB
app.get('/geturl', async (req, res) => {
    try {
        const data = await Url.findOne(); // Get first document
        if (data) {
            res.json({ url: data.url });
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (err) {
        console.error('❌ Error fetching URL:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
