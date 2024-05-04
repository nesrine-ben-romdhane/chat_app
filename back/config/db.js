const mongoose = require("mongoose")
const dbConnection =()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true ,
    
    }).then(()=>{
            console.log("DB connection successffuly ")
        }).catch((err)=>{
            console.log(err.message)
        })
}
module.exports=dbConnection ;