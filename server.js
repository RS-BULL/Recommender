const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors());

// ✅ Basic test route
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// ✅ Fix: Add a search route
app.get("/search", (req, res) => {
    const query = req.query.q;
    
    if (!query) {
        return res.status(400).json({ error: "Missing search query" });
    }

    // For now, just return a fake response (replace with actual logic later)
    res.json({
        success: true,
        message: `Searching for: ${query}`,
        videos: []
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
