import Vue from 'vue';
import AV from 'leancloud-storage';
var APP_ID = 'uRvBAjuUrX0Ggm14lxoBQrwr-gzGzoHsz';
var APP_KEY = 'FuTCShWf3zyDUR0kTJYSf25y';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })


var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: [],
        actionType: 'signUp',
        formData: {
            username: "",
            password: ""
        },
        currentUser: null
    },
    created: function(){
        //onbeforeunload 事件指在窗口刷新或关闭时候执行
        window.onbeforeunload = ()=>{
            let dataString = JSON.stringify(this.todoList)
            console.log(dataString);
            window.localStorage.setItem('myTodos', dataString)
        }

        let oldDataString = window.localStorage.getItem('myTodos')
        let oldData = JSON.parse(oldDataString)
        this.todoList = oldData || []

        this.currentUser = this.getCurrentUser() //检查用户是否登陆
    },
    methods: {
        addTodo: function(){
            var date = new Date()
            console.log(date.toLocaleString());
            this.todoList.push({
                title: this.newTodo,
                createdAt: date.toLocaleString(),
                done: false
            })
            this.newTodo = ''
        },
        removeTodo: function(todo){
            let index = this.todoList.indexOf(todo)
            this.todoList.splice(index, 1)
        },
        signUp: function () {
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then( (loginedUser) => {
                //console.log(loginedUser);
                this.currentUser = this.getCurrentUser()
            }, function (error) {
                alert("注册失败")
            });
        },
        login:function(){
            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser)=>{
                //console.log(loginedUser);
                this.currentUser = this.getCurrentUser()
            }, function(error){
                alert("登陆失败")
            });
        },
        getCurrentUser: function(){
            // let {id, createdAt, attributes: {username}} = AV.User.current()
            // return {id, username, createdAt}
            let current = AV.User.current() //获取用户当前的状态
            if(current){
                let {id, createdAt, attributes: {username}} = current
                return {id, username, createdAt}
            }else{
                return null
            }
        },
        logout: function(){
            AV.User.logOut()
            this.currentUser = null
            window.location.reload()
        }
    }
})
