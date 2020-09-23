//验证token
//对应的配置信息
const JwtStrategy=require("passport-jwt").Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const mongoose=require("mongoose");
const User=mongoose.model("users");
const key=require("../config/key");
const opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=key.secretOrKey;
module.exports=passport=>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        User.findById(jwt_payload.id)
            .then(user=>{
                if(user){
                    return done(null,user);
                }else{
                    return done(null,false);
                }
            })
            .catch(err=>console.log(err))
    }));
};