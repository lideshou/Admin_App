//引入我们的依赖
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const app=express();
const passport=require("passport");

//引入users.js
const users=require("./routers/api/users");
const profiles=require("./routers/api/profiles");

//DB config
const db=require("./config/keys").mongoURI;

//使用body-Parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//connect to mongodb
mongoose.connect(db)
    .then(()=>console.log("MongoDB Connected!"))
    .catch(err=>console.log(err));

//passport的初始化
app.use(passport.initialize());

require("./config/passport")(passport);

//使用router
app.use("/api/users",users);
app.use("/api/profiles",profiles);

const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log('Server running on port %s',port);
})