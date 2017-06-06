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
        //beforeunload 事件里面的所有请求都发不出去，会被取消！第一个坑
        // window.onbeforeunload = ()=>{
        //     let dataString = JSON.stringify(this.todoList)
        //     console.log(dataString);
        //     // window.localStorage.setItem('myTodos', dataString)
        //
        //     // 声明一个 Todo 类型
        //     var AVTodos = AV.Object.extend("AllTodos");
        //      // 新建一个 Todo 对象
        //     var avTodos = new AVTodos();
        //     avTodos.set("content", dataString);
        //     avTodos.save().then(function(todo){
        //         // 成功保存后，执行其他逻辑。
        //         console.log("保存成功");
        //     }, function(error){
        //         //异常处理
        //         console.error("保存失败");
        //     });
        //     //debugger
        // }

        // 从 LeanCloud 读取 todos 的逻辑先不写
        // let oldDataString = window.localStorage.getItem('myTodos')
        // let oldData = JSON.parse(oldDataString)
        // this.todoList = oldData || []

        this.currentUser = this.getCurrentUser() //检查用户是否登陆
        if(this.currentUser){
            var query = new AV.Query("AllTodos");
            query.find()
                // .then(function(todos){
                //     console.log(todos);
                .then((todos)=>{
                    let avALLTodos = todos[0] //因为理论上 AllTodos 只有一个，所以我们取结果的第一项
                    let id = avALLTodos.id
                    this.todoList = JSON.parse(avALLTodos.attributes.content)  // 为什么有个 attributes？因为我从控制台看到的
                    this.todoList.id = id   //数组也是对象，可以设置属性id
                // })
                }, function(error){
                    console.error(error)
                })
        }
        this.fetchTodos()   //将原来的一坨代码取一个名字叫做 fetchTodos

    },
    methods: {
        fetchTodos: function(){
            if(this.currentUser){
                var query = new AV.Query("AllTodos");
                query.find()
                    // .then(function(todos){
                    //     console.log(todos);
                    .then((todos)=>{
                        let avALLTodos = todos[0] //因为理论上 AllTodos 只有一个，所以我们取结果的第一项
                        let id = avALLTodos.id
                        this.todoList = JSON.parse(avALLTodos.attributes.content)  // 为什么有个 attributes？因为我从控制台看到的
                        this.todoList.id = id   //数组也是对象，可以设置属性id
                    // })
                    }, function(error){
                        console.error(error)
                    })
            }
        },
        updateTodos:function(){
            let dataString = JSON.stringify(this.todoList)
            let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id)
            avTodos.set('content', dataString)
            avTodos.save().then(()=>{
                console.log("更新成功");
            })
        },
        saveTodos: function(){
            let dataString = JSON.stringify(this.todoList)
            var AVTodos = AV.Object.extend("AllTodos");
            var avTodos = new AVTodos()
            var acl = new AV.ACL()
            acl.setReadAccess(AV.User.current(), true) //只有这个用户能读
            acl.setWriteAccess(AV.User.current(), true) //只有这个用户能写
            avTodos.set("content", dataString);
            avTodos.setACL(acl)  //设置访问控制
            // avTodos.save().then(function(todo){
            avTodos.save().then((todo)=>{
                this.todoList.id = todo.id  //一定要把id挂到 this.todoList 下，否则下次就不会调用 updateTodos 了
            // })
                // alert("保存成功")
                console.log("保存成功");
            }, function(error){
                alert("保存失败")
            })
        },
        saveOrUpdateTodos: function(){
            if(this.todoList.id){
                this.updateTodos()
            }else {
                this.saveTodos()
            }
        },
        addTodo: function(){
            var date = new Date()
            console.log(date.toLocaleString());
            this.todoList.push({
                title: this.newTodo,
                createdAt: date.toLocaleString(),
                done: false
            })
            this.newTodo = ''
            // this.saveTodos()
            this.saveOrUpdateTodos() //不能用saveTodos了
        },
        removeTodo: function(todo){
            let index = this.todoList.indexOf(todo)
            this.todoList.splice(index, 1)
            //this.saveTodos()
            this.saveOrUpdateTodos() //不能用saveTodos了

        },
        signUp: function () {
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then( (loginedUser) => {
                //console.log(loginedUser);
                this.currentUser = this.getCurrentUser()
            },  (error)=> {
                alert("注册失败")
                console.log(error);
            });
        },
        login:function(){
            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser)=>{
                //console.log(loginedUser);
                this.currentUser = this.getCurrentUser()
                this.fetchTodos()   //登陆成功后读取todos
            }, function(error){
                alert("登陆失败")
                console.log(error);
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
