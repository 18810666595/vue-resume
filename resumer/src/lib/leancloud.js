console.log("leancloud start");
import AV from "leancloud-storage"

var APP_ID = "uRvBAjuUrX0Ggm14lxoBQrwr-gzGzoHsz"
var APP_KEY = "FuTCShWf3zyDUR0kTJYSf25y"

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

export default AV
console.log("leancloud end");
