const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config({
    path: './.env' 
});

// Define CORS options
const corsOptions = {
    origin: 'https://paytm-react-project-dzbl.vercel.app', // Specify the allowed origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers)
};

// Use CORS middleware with options
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests for all routes

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
