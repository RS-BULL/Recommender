const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS to allow frontend to call the backend
app.use(cors());

// Basic route for testing
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
