/*
* index.js
* actions.js
* mutations.js
* mutations-type.js
* state.js
* 都是vuex的核心文件
*
*
*
* */

/*必须拿的两个东西*/
import Vue from "vue"
import Vuex from "vuex"

import state from "./state"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex);//使用

//对外输出
export default new Vuex.Store({
    state,//挂载
    mutations,//挂载
    actions//挂载
});
