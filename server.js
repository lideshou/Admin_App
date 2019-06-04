//引入我们的依赖
const express=require("express");
const mongoose=require("mongoose");
const app=express();

//引入users.js
const users=require("./routers/api/users");

//DB config

const db=require("./config/keys").mongoURI;

//connect to mongodb

mongoose.connect(db)
    .then(()=>console.log("MongoDB Connected!"))
    .catch(err=>console.log(err));


app.get("/",(req,res)=>{
    res.send("Hello World!");
})

//使用router

app.use("/api/users",users);

const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log('Server running on port %s',port);
})