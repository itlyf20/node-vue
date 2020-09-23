const express=require("express");
const router=express.Router();
//加密密码
const bcrypt=require("bcrypt");
//生成token
const jwt=require("jsonwebtoken");
const passport=require("passport");
//公共的keys用于验证token
const keys=require("../../config/key");
//model文件，集合表
const User=require("../../models/usermodel");
//注册
router.post("/register",(req,res)=>{ 
   User.findOne({email:req.body.email}).then((user)=>{
      if(user){
         return res.status(400).json("邮箱已被注册！")
      }else{
         const newUser=new User({
            username:req.body.username,
            email:req.body.email,
			address:req.body.address,
			tel:req.body.tel,
            password:req.body.password,
            identity:req.body.identity
         });
         //加密密码
         bcrypt.genSalt(10,function (err,salt) {
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
               if(err) throw err;
               newUser.password=hash;
               newUser.save()
                   .then(user=>res.json({
                       username:newUser.username,
                       email:newUser.email,
					   address:newUser.address,
					   tel:newUser.tel,
                       identity:newUser.identity
                   }))
                   .catch((err)=>console.log(err));
            })
         })
      }
   })
});
//登录
router.post("/login",(req,res)=>{
   const email=req.body.email;
   const password=req.body.password;
   User.findOne({email})
       .then(user=>{
          if(!user){
             return res.status(400).json("用户不存在");
          }else{
             //密码匹配
             bcrypt.compare(password,user.password)
                 .then(isMatch=>{
                    if(isMatch){
                       const rule={id:user._id,username:user.username,identity: user.identity,address:user.address,tel:user.tel};
                       jwt.sign(rule,keys.secretOrKey,{expiresIn: 3600},(err,token)=>{
                           if(err) throw err;
                           res.json({
                               msg:"login success",
                               success:true,
                               token:"Bearer "+token
                           })
                       });
                    }else{
                       return res.status(400).json("密码错误")
                    }
                 })
          }
       })
});
//验证token
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
   res.json({
       id:req.user.id,
       username:req.user.username,
       email:req.user.email,
       identity:req.user.identity,
	   address:req.user.address,
	   tel:req.user.tel
   })
});
//获取所有用户信息
router.get("/",passport.authenticate("jwt",{session:false}),(req,res)=>{
   User.find().then(users=>{
       if(!users){
           return res.status(404).json("没有任何内容")
       }else{
           res.json(users)
       }
     })
       .catch(err=>res.status(404).json(err)) ;
});
module.exports=router;