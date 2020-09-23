const express =require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
//验证token的插件
const passport=require("passport");
const app=express();

const users=require("./router/api/userRouter");
const profiles=require("./router/api/profileRouter")
//连接数据库
const db=require("./config/key").mongoUrl;
//使用bodyparser中间键方便使用post请求
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>console.log("Mongodb Connected Success"))
    .catch((err)=>console.log(err));

//passpor初始化
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users",users);
app.use("/api/profiles",profiles);

const port=process.env.PORT ||5000;
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})