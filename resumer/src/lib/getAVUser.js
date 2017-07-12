console.log("getAVUser start");
import AV from "../lib/leancloud"
export default function(user){
    var {id, attributes:{username}} = user || AV.User.current() || {attributes:{}}
    // return {id, username}

    return {
        id: id || "",
        username: username || ""
    }
}
console.log("getAVUser end");
