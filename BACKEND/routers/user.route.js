const { Router } = require("express");
const {GetUser,Signup,Login,deleteUser,verifyUser,getAdmins, ActiveAdmins, toggleUserActiveStatus} = require("../controllers/user.controller");
const { decode } = require("../middlewares/decodeJwt");
const { isSuperAdmin } = require("../middlewares/admin");
const userRouter = Router();

userRouter.get("/", GetUser);
userRouter.post("/signup", Signup);
userRouter.post("/login", Login);
userRouter.delete("/:id", deleteUser);
userRouter.get("/verify/:token/:otp", verifyUser);
userRouter.get("/all-admin", decode, isSuperAdmin, getAdmins);
userRouter.patch("/admin-update/:id" , toggleUserActiveStatus)
module.exports = { userRouter };