const router = require("express").Router()
const messageCtrl = require("../controllers/messageController")
router.post("/addMessage",messageCtrl.createMessage)
router.post("/AllMessage",messageCtrl.getMessages) 
module.exports=router ;