const express = require("express");
const cors = require("cors");
const axios = require("axios");  // ✅ Import axios for making API requests

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// ✅ Fetch videos from Invidious
app.get("/search", async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: "Missing search query" });
    }

    try {
        const invidiousURL = `https://invidious.snopyta.org/api/v1/search?q=${encodeURIComponent(query)}&type=video`;
        const response = await axios.get(invidiousURL);
        
        if (!response.data || !Array.isArray(response.data)) {
            return res.status(500).json({ error: "Invalid API response" });
        }

        // ✅ Extract relevant video data
        const videos = response.data.map(video => ({
            title: video.title,
            videoId: video.videoId,
            views: video.viewCount,
            likes: video.likeCount || 0,
            duration: video.lengthSeconds,
            thumbnail: `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`,
        }));

        res.json({ success: true, videos });

    } catch (error) {
        console.error("Error fetching videos:", error);
        res.status(500).json({ error: "Failed to fetch videos" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
