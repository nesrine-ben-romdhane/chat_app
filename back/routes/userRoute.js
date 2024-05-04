const router = require("express").Router()
const userCtrl = require("../controllers/userController")
router.post("/register",userCtrl.register)
router.post("/login",userCtrl.login)
router.post("/setAvatar/:id",userCtrl.setAvatar)
router.get("/allUsers/:id",userCtrl.getAllUsers)
router.get("/logout/:id", userCtrl.logOut);
module.exports=router 