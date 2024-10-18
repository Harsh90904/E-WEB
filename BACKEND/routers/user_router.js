const {Router} = require("express");
const { signup, login, verifiedotp, upload } = require("../controllers/user_controller");
const userrouter = Router();

userrouter.post("/signup" ,upload.single('img'), signup)
userrouter.post("/login" , login);
userrouter.post("/verifiy" , verifiedotp );

userrouter.post('/upload',upload.single('img'),(req,res)=> {
    res.send("file uploaded");
});


//signup
userrouter.get("/signup" , (req, res)=>{
    res.render('signup')
})
userrouter.get("/verifiy" , (req, res)=>{
    res.render('verifiy')
})
userrouter.get("/login" , (req, res)=>{
    res.render('login')
})


module.exports = userrouter;