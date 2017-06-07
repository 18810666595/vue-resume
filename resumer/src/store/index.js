import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // count: 0,    //测试代码
        selected:"profile",
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
                {company: "鸡飞狗跳公司", content: "公司总部设在XXXX区，先后在北京、上海成立分公司。专注于移动XXX领域，主打产品XXXXX，它将资讯、报纸、杂志、图片、微信等众多内容，按照用户意愿聚合到一起，实现深度个性化定制。我的主要工作如下:1. 完成既定产品需求。2. 修复 bug。"},
                {company: "狗急跳墙责任有限公司", content: "公司总部设在XXXX区，先后在北京、上海成立分公司。专注于移动XXX领域，主打产品XXXXX，它将资讯、报纸、杂志、图片、微信等众多内容，按照用户意愿聚合到一起，实现深度个性化 定制。我的主要工作如下:1. 完成既定产品需求。2. 修复 bug"}
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
        // increment (state) {   //测试代码
        //     state.count++
        // },
        switchTab (state, payload){
            state.selected = payload
        }
    }
})
