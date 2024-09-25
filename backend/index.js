const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config({
    path: './.env' 
});



// Use CORS middleware with options
app.use(cors({
    origin: 'https://paytm-react-project-jgkr.vercel.app' // Allow requests from this origin
}));
 // Handle preflight requests for all routes

// Middleware to parse JSON requests
app.use(express.json());

// Import your routes
const mainRouter = require("./routes");

// Mount your API routes under /api/v1
app.use("/api/v1", mainRouter);
app.get("/", (req, res) => {
    res.send("backend is running");
});


// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Backend is running on port ${PORT}`);
});
