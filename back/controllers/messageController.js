const Message = require("../models/messageModel")
module.exports.createMessage= async(req,res,next)=>{
   try{
    const {from,to,message}=req.body
    const data = await Message.create({
        message:{text:message},
        users:[from,to],
        sender:from
    })
    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
   }
   catch(err){
    next(err)

   }
}

module.exports.getMessages = async(req,res,next)=>{
    try{
        const {from,to}=req.body
        console.log("req.body",req.body)
        const messages = await Message.find({users:{
            $all:[from,to]}
        }).sort({updatedAt : 1})
        const projectedMessage = messages.map((msg)=>{
            return({
                fromSelf : msg.sender.toString() === from ,
                message : msg.message.text
            })
        })
        console.log(projectedMessage)

        res.json(projectedMessage)
    }
    catch(err){
        next(err)
    }
}