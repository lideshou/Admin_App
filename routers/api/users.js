//Log in &register
const express=require("express");
const router=express.Router();
const bcryptNodejs=require("bcrypt-nodejs");
const gravatar=require("gravatar");
const jwt=require("jsonwebtoken");
const passport=require("passport");

const keys=require("../../config/keys");
const User=require("../../modules/User");

//$router POST api/users/register
//@desc 返回的请求的json数据
//access public

router.post("/register",(req,res)=>{
    //console.log(req.body);

    //查询数据库中是否拥有邮箱
    User.findOne({email:req.body.email})
        .then((user)=>{
            if (user){
                return res.status(400).json("邮箱已被注册！");
            }else {
                var avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

                const newUser=new User({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    identity:req.body.identity,
                    avatar
                })

                bcryptNodejs.genSalt(10, function(err, salt) {
                    bcryptNodejs.hash(newUser.password, salt,null,(err, hash) =>{
                        if(err) throw  err;

                        newUser.password=hash;

                        newUser.save()
                            .then(user=>res.json(user))
                            .catch(err=>console.log(err));
                    });
                });
            }
        })
})

//$router POST api/users/login
//@desc 返回token jwt passport
//access public
router.get("/login",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    console.log(req.body);
    console.log("LDS");
    //查询数据库
    User.findOne({email})
        .then(user=>{
            if(!user){
                return res.status(404).json("当前用户不存在！");
            }

            //密码匹配
            bcryptNodejs.compare(password, user.password,function (err,isMatch) {
                if (isMatch){
                    const rule={id:user.id,name: user.name,avatar: user.avatar,identity: user.identity};
                    jwt.sign(rule,keys.srcretOrKey,{expiresIn: 3600},(err,token)=>{
                        if (err) throw err;
                        res.json({
                            success:true,
                            token:"Bearer "+token
                        })
                    })
                }else {
                    return res.status(400).json("密码错误！");
                }
            })
        })
})

//$router GET api/users/current
//@desc return current user
//access Private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    });
})

module.exports=router;