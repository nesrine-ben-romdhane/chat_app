const User = require("../models/userModel")
const bcrypt = require("bcrypt")

module.exports.login=async(req,res,next)=>{
    try{
        const {username , password}=req.body
        const user = await User.findOne({username})
        console.log("user",user)
        if (!user){
            return res.json({msg:"incorrect username or password",status:false})
        }
        const isPasswordValide = await bcrypt.compare(password,user.password)
        if (!isPasswordValide){
            return res.json({msg:"incorrect username or password",status:false})
        }
        
        return res.json({user:{
           _id:user._id ,
           username:user.username,
            email:user.email,
            isAvatarImageSet:user.isAvatarImageSet,
            AvatarImage:user.AvatarImage

        },status:true})

        
    }
    catch(err){
        next(err)
    }

}
module.exports.register=async(req,res,next)=>{
   try{
    const {username,email,password}=req.body
    const usernameCheck = await User.findOne({username})
    if (usernameCheck){
        return res.status(400).json({msg:"Username already used",status:false})

    }
    const emailCheck = await User.findOne({email})
    if (emailCheck) return res.json({msg:"email already used",status:false})
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })
   await user.save()

    return res.status(200).json({status:true})
   } catch(ex){
    next(ex)
   }
}

module.exports.setAvatar=async(req,res,next)=>{
    try{
        const userId = req.params.id
        const AvatarImage = req.body.image 
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true ,
            AvatarImage
        },{new:true}).select("-password")
       
        res.json({
            isSet:userData.isAvatarImageSet ,
            image :userData.AvatarImage
        })
    }
    catch(err){
        next(err)
    }
}


module.exports.getAllUsers=async(req,res,next)=>{
    try{
        const userId = req.params.id
        const users = await User.find({ _id: { $ne: userId }}).select(["email","username", "AvatarImage","_id"])
        return(
        res.json({users})
        )
        
    }
    catch(err){
        next(err)
    }
}



module.exports.logOut = (req, res, next) => {
    try {
      if (!req.params.id) return res.json({ msg: "User id is required " });
      onlineUsers.delete(req.params.id);
      return res.status(200).send();
    } catch (ex) {
      next(ex);
    }
  };