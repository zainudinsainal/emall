import axios from "axios"

//封装get post请求
export default function ajax(url="",params={},type="GET") {
    //1.变量
    let promise;

    //2.返回一个promise
    return new Promise((resolve, reject)=>{

        //2.1判断请求的类型
        if(type.toUpperCase()==="GET"){
            //2.2拼接字符串
            let paramsStr = "";
            //2.3遍历
            Object.keys(params).forEach(key=>{
                paramsStr += key + "=" + params[key] + "&";
            });
            //2.4过滤最后的&
            if(paramsStr){
                paramsStr = paramsStr.substr(0,paramsStr.lastIndexOf("&"));
            }
            //2.5拼接完整路径
            url += "?"+paramsStr;
            //2.6发起get请求
            promise = axios.get(url);
        }else if(type.toUpperCase()==="POST"){
            //2.7发起post请求
            promise = axios.post(url,params);
        }
        //2.8处理返回结果
        promise.then((response)=>{
            resolve(response.data);
        }).catch(error=>{
            reject(error);
        })
    })
}
