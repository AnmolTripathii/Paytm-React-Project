const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config({
    path: './.env' 
});




app.use(cors({
    origin: 'https://paytm-react-project-jgkr.vercel.app'
}));



app.use(express.json());


const mainRouter = require("./routes");


app.use("/api/v1", mainRouter);
app.get("/", (req, res) => {
    res.send("backend is running");
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Backend is running on port ${PORT}`);
});
