const  mongoose  = require("mongoose")
require("dotenv").config


const DBConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://diyoraharsh6:node@cluster0.gp6kv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("SERVER IS A CONNECT ARE DABABASE!!");
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = DBConnect;