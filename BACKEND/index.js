const express = require("express");
require("dotenv").config
const cors = require("cors");
const DBConnect = require("./config/DB");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PROT || 8090;

app.get("/", (req,res)=> {
    res.send("API ARE RUNING....");
})

app.listen(PORT , ()=> {
    console.log("Server is a runing!!");
    DBConnect()
})