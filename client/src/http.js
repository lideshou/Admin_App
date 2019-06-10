import axios from "axios"
import {Message, Loading } from 'element-ui';
import router from "./router"

let loading;
function startLoading() {
    loading=Loading.service({
        lock:true,
        text:"拼命加载ing...",
        background:"rgba(0,0,0,.7)"
    });
}

function endLoading() {
    loading.close();
}

//请求拦截
axios.interceptors.request.use(config=>{
    //加载动画
    startLoading();
    if (localStorage.liToken) {
        //设置统一的请求头
        config.headers.Authorization=localStorage.liToken;
    }
    return config;
}),error=>{
    return Promise.reject(error);
};

//响应拦截
axios.interceptors.response.use(response=>{
    endLoading();
    return response;
}),error=>{
    //错误提醒
    endLoading();
    Message.error(error.response.data);
    return Promise.reject(error);

    //获取错误状态码
    const {status}=error.response;
    if(status==401){
        Message.error("token已失效，请重新登录！");
        //清除token
        localStorage.removeItem("liToken");
        //跳转到登录页面
        router.push("/login");
    }
}

export default axios;