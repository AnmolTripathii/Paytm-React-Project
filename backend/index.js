const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({
    path: './.env' 
});




app.use(cors({
    origin: 'https://paytm-react-project-jgkr.vercel.app',
    methods: 'GET,POST,PUT,DELETE'
}));

// app.options('*', cors());

app.use(express.json());


const mainRouter = require("./routes");


app.use("/api/v1", mainRouter);
app.get("/", (req, res) => {
    res.send("backend is running");
});

const connectDB = async()=>{
    try{
        const connectionInstance= await mongoose.connect(process.env.mongoDbUrl)
        console.log(`\n db connected !! DB HOST : ${connectionInstance.connection.host}`);
    }
    catch (error){
        console.log("MONGOOSE CONNECTION ERROR",error);
        process.exit(1)
    }
}
connectDB()
.then(()=>{
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, function () {
        console.log(`Backend is running on port ${PORT}`);
    });
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err)
})



