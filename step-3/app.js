import bar from './bar';
import Vue from 'vue';


var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: []
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
    },
    methods: {
        addTodo: function(){
            var date = new Date()
            this.todoList.push({
                title: this.newTodo,
                createdAt: date.toString().slice(0,15),
                done: false
            })
            this.newTodo = ''
        },
        removeTodo: function(todo){
            let index = this.todoList.indexOf(todo)
            this.todoList.splice(index, 1)
        }
    }
})
