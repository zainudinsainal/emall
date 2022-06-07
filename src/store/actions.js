import {USER_INFO} from "./mutations-type"
import {getStore} from "./../config/global"
import {getUserInfo} from "./../service/api/index"

export default {
    //1.同步用户信息
    syncUserInfo({commit},userInfo){
        commit(USER_INFO,{userInfo});
    },
    //2.自动登陆
    async reqUserInfo({commit}){
        //2.1从本地获取数据
        let userInfo = JSON.parse(getStore("userInfo"));
        if(userInfo){
            commit(USER_INFO,{userInfo});
        }else {
            //2.1从服务端验证
            let result = await getUserInfo();
            console.log(result);
            if(result.success_code === 200){
                commit(USER_INFO,{userInfo:result.data});
            }
        }
    }

}
