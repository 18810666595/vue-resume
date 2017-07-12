<template>
  <div>
      <form @submit.prevent="signIn">
          <div class="row">
              <label>用户名</label>
              <input type="text" required v-model="formData.username">
          </div>
          <div class="row">
              <label>密码</label>
              <input type="password" required v-model="formData.password">
          </div>
          <div class="actions">
              <input type="submit" value="登陆">
              <span>{{errorMessage}}</span>
          </div>
      </form>
  </div>
</template>

<script>
console.log("SignInForm start");
import AV from "../lib/leancloud"
import getErrorMessage from "../lib/getErrorMessage"
import getAVUser from "../lib/getAVUser"

export default {
    name: "SignInForm",
    data(){
        return {
            formData: {
                username: "",
                password: ""
            },
            errorMessage: ""
        }
    },
    methods: {
        signIn(){
            let {username, password} = this.formData
            AV.User.logIn(username, password).then(()=>{
                // this.$store.commit("setUser", getAVUser())
                this.$emit("success", getAVUser())
            },(error)=>{
                this.errorMessage = getErrorMessage(error)
            })
        }
    }
}
console.log("SignInForm end");
</script>

<style lang="css">
</style>
