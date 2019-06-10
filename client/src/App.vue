<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import jwtDecode from "jwt-decode"
  export default {
    name:"app",
    components:{

    },
    created(){
      if (localStorage.liToken) {
        const decode=jwtDecode(localStorage.liToken);
        //token存储到vuex中
        this.$store.dispatch("setAuthenticated",!this.isEmpty(decode));
        this.$store.dispatch("setUser",decode);
      }
    },
    methods:{
      //判断解析后的token是否为空
      isEmpty(value){
        return (
                value===undefined||value===null
                ||(typeof value==="object"&&Object.keys(value).length===0)||
                (typeof value==="string"&&value.trim().length===0)
        );
      }
    }
  };
</script>

<style>
  html,body,#app{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
