<template>
    <div id="topbar">
        <div class="wrapper">
            <span class="logo">Resumer</span>
            <div class="action">
                <!-- <span>{{user}}</span>
                <a class="button primary" href="#" @click.prevent="signUpDialogVisible=true">注册</a>
                <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible=false">
                    <SignUpForm @success="login($event)"/>
                </MyDialog>
                <a class="button" href="#">登陆</a> -->
                <div v-if="logined" class="userActions">
                    <span class="welcome">你好，{{user.username}}</span>
                    <a class="button" href="#" @click.prevent="signOut">登出</a>
                </div>
                <div v-else class="userActions">
                    <a class="button primary" href="#" @click.prevent="signUpDialogVisible=true">注册</a>
                    <!-- <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible=false">
                        <SignUpForm @success="signIn($event)"/>
                    </MyDialog> -->
                    <a class="button" href="#" @click.prevent="signInDialogVisible=true">登陆</a>
                    <!-- <MyDialog title="登陆" :visible="signInDialogVisible" @close="signInDialogVisible=false">
                        <SignUpForm/>
                    </MyDialog> -->
                </div>
                <button class="button primary">保存</button>
                <button class="button">预览</button>
            </div>
        </div>
        <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible=false">
            <SignUpForm @success="signIn($event)"/>
        </MyDialog>
        <MyDialog title="登陆" :visible="signInDialogVisible" @close="signInDialogVisible=false">
            <SignInForm @success="signIn($event)"/>
        </MyDialog>

    </div>
</template>

<script>
console.log("Topbar start");
    import MyDialog from "./MyDialog"
    import SignUpForm from "./SignUpForm"
    import SignInForm from "./SignInForm"
    import AV from "../lib/leancloud"


    export default{
        name: "Topbar",
        data(){
            return {
                signUpDialogVisible: false,
                signInDialogVisible: false
            }
        },
        computed: {
            user(){
                return this.$store.state.user
            },
            logined(){
                return this.user.id
            }
        },
        components: {
            MyDialog, SignUpForm, SignInForm
        },
        methods:{
            signOut(){
                AV.User.logOut()
                this.$store.commit("removeUser")
            },
            signIn(user){
                this.signUpDialogVisible = false
                this.signInDialogVisible = false
                this.$store.commit("setUser", user)
            }
        }
    }
console.log("Topbar end");
</script>

<style scoped lang="scss">  //scoped 所有样式只在本组件内有效，不会影响到其他组件
    #topbar {
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
        height: 64px;
        >.wrapper {
            min-width: 1024px;
            max-width: 1440px;
            margin: 0 auto;
            height: 64px;
        }
        >.wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 16px;
        }
        .logo {
            font-size: 24px;
            color: #000;
        }
    }

    .button {   //由于加了scoped,所以这个button选择器只在本组件内有效，不会影响其他组件
        width: 72px;
        height: 32px;
        border: none;
        cursor: pointer;
        font-size: 18px;
        background: #ddd;
        color: #222;
        text-decoration: none;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        &:hover {
            box-shadow: 1px 1px 1px hsla(0,0,0,0.50)
        }
        &.primary {
            background:#02af5f;
            color: white;
        }
    }
    .action {
        display: flex;
        .userActions{
            margin-right: 3em;
            .welcome{
                margin-right: .5em;
            }
        }
    }




</style>
