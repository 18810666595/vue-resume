console.log("index start");

import Vuex from "vuex"
import Vue from "vue"
import objectPath from "object-path"

Vue.use(Vuex) //不写这句话，浏览器就会报错

export default new Vuex.Store({
    state: {
        // count: 0,    //测试代码
        selected:"profile",
        user:{
            id: "",
            username: ""
        },
        resume: {
            // visibleItems:["profile", "work history", "education", "projects", "awards", "contacts", "others"],
            config: [
                {field: "profile", icon: "id"},
                {field: "workHistory", icon: "work"},
                {field: "education", icon: "book"},
                {field: "projects", icon: "heart"},
                {field: "awards", icon: "cup"},
                {field: "contacts", icon: "phone"},
            ],
            profile: {
                name: "陈功",
                city: "北京",
                title: "应聘前端",
                birthday: "1992-09-01"
            },
            "workHistory": [
                {company: "", content: ``},
                {company: "", content: ``}
            ],
            education: [
                {school: "中国石油大学(北京)", content: "本科"},
                {school: "中国石油大学(北京)", content: "硕士"}
            ],
            projects: [
                {name: "project A", content: "文字"},
                {name: "project B", content: "文字"}
            ],
            awards: [
                {name: "奖学金", content: "2012年至2014年连续三年获一等奖学金"},
                {name: "三好学生", content: "2012年至2014年连续三年获三好学生"},
            ],
            contacts: [
                {contact: "phone", content: "18810666595"},
                {contact: "QQ", content: "12345678"}
            ],
        }
    },
    mutations: {
        initState(state, payload){
            Object.assign(state, payload)
        },
        // increment (state) {   //测试代码
        //     state.count++
        // },
        switchTab (state, payload){
            state.selected = payload
            localStorage.setItem("state", JSON.stringify(state))
        },
        updateResume(state, {path, value}) {
            // state.resume[field][subfield] = value
            objectPath.set(state.resume, path, value)
            localStorage.setItem("state", JSON.stringify(state))
        },
        setUser(state, payload){
            Object.assign(state.user, payload)
            console.log(state.user);
        },
        removeUser(state){
            state.user.id = "";
        }
    }
})
console.log("index end");
