const express=require("express");
const router=express.Router();
const passport=require("passport");
//model文件，集合表
const Profile=require("../../models/profilemodel");

//创建信息接口
router.post("/addprofiles",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFields={};
    if(req.body.type) profileFields.type=req.body.type;
    if(req.body.describe) profileFields.describe=req.body.describe;
    if(req.body.income) profileFields.income=req.body.income;
    if(req.body.expend) profileFields.expend=req.body.expend;
    if(req.body.cash) profileFields.cash=req.body.cash;
    if(req.body.remark) profileFields.remark=req.body.remark;
    new Profile(profileFields).save().then(profile=>{
        res.json(profile)
    })
});
//获取所有信息
router.get("/",passport.authenticate("jwt",{session:false}),(req,res)=>{
   Profile.find().then(profile=>{
       if(!profile){
           return res.status(404).json("没有任何内容")
       }else{
           res.json(profile)
       }
     })
       .catch(err=>res.status(404).json(err)) ;
});
//获取单个信息
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.find({_id:req.params.id}).then(profile=>{
        if(!profile){
            return res.status(404).json("没有任何内容")
        }else{
            res.json(profile)
        }
    })
        .catch(err=>res.status(404).json(err)) ;
});

//编辑信息
router.post("/editprofiles/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFields={};
    if(req.body.type) profileFields.type=req.body.type;
    if(req.body.describe) profileFields.describe=req.body.describe;
    if(req.body.income) profileFields.income=req.body.income;
    if(req.body.expend) profileFields.expend=req.body.expend;
    if(req.body.cash) profileFields.cash=req.body.cash;
    if(req.body.remark) profileFields.remark=req.body.remark;
    Profile.findOneAndUpdate({_id:req.params.id},{$set:profileFields},{new:true})
       .then(profile=>res.json(profile))
});

//删除信息接口
router.delete("/delprofile/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    new Profile({_id:req.params.id}).remove(function(err,profile){
        if(err){
            res.status(404).json(err)
        }else{
            res.json({
                msg:'删除成功！',
                data:profile
            })
        }
    })
});

module.exports=router;