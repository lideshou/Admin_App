//Log in &register
const express=require("express");
const router=express.Router();
const passport=require("passport");

const User=require("../../modules/Profile");
//$router GET api/profiles/test
//@desc 返回的请求的json数据
//access public
router.get("/test",(req,res)=>{
    res.json({msg:"profile works!"});
});

//$router POST api/profiles/add
//@desc 创建信息接口
//access private(如果是私有性的就必须要验证token)
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFields={};

    //判断返回的数据里关于Profile里的数据是否存在
    if (req.body.type) profileFields.type=req.body.type;
    if (req.body.describe) profileFields.describe=req.body.describe;
    if (req.body.income) profileFields.income=req.body.income;
    if (req.body.expend) profileFields.expend=req.body.expend;
    if (req.body.cash) profileFields.cash=req.body.cash;
    if (req.body.remark) profileFields.remark=req.body.remark;

    //创建一个Profile对象，如果存储成功的话则返回profile对象
    new Profile(profileFields).save()
        .then(profile=>{
            res.json(profile);
        })
});

//$router GET api/profiles
//@desc 获取所有信息
//access private
router.get("/",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.find()
        .then(profile=>{
            if(!profile){
                return res.status(404).json("没有任何内容！");
            }
            res.json(profile);
        })
        .catch(err=>res.status(404).json("请求错误！"))
});

//$router GET api/profiles/:id
//@desc 获取单个信息
//access private
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.id})
        .then(profile=>{
            if(!profile){
                return res.status(404).json("没有任何内容！");
            }
            res.json(profile);
        })
        .catch(err=>res.status(404).json("请求错误！"))
});

//$router POST api/profiles/edit
//@desc 编辑信息接口
//access private(如果是私有性的就必须要验证token)
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFields={};

    //判断返回的数据里关于Profile里的数据是否存在
    if (req.body.type) profileFields.type=req.body.type;
    if (req.body.describe) profileFields.describe=req.body.describe;
    if (req.body.income) profileFields.income=req.body.income;
    if (req.body.expend) profileFields.expend=req.body.expend;
    if (req.body.cash) profileFields.cash=req.body.cash;
    if (req.body.remark) profileFields.remark=req.body.remark;

    //编辑一个对象
    Profile.findOneAndUpdate(
        {_id:req.params.id},
        {$set:profileFields},
        {new:true}
    ).then(profile=>res.json(profile))
});

//$router POST api/profiles/delete/:id
//@desc 删除信息接口
//access private(如果是私有性的就必须要验证token)
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.findOneAndRemove({_id:req.params.id})
        .then(profile=>{
            profile.save().then(profile=>res.json(profile));
        })
        .catch(err=>res.status(404).json("删除失败！"))
});

module.exports=router;