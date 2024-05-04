const express = require("express")
const cors = require("cors")
const dbConnection = require("./config/db")
const socket = require("socket.io");


const app = express()
require("dotenv").config()
app.use(cors())
app.use(express.json())
dbConnection()
app.use("/api/auth",require("./routes/userRoute"))
app.use("/api/messages",require("./routes/messageRoute"))



const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on Port ${process.env.PORT}`)
})
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });
  
