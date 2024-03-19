// 引入 axios
import axios from 'axios'
//引入饿了么UI提示
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
//这里是设置所有地址的ip
let ip="http://127.0.0.1/"
// let ip="https://springbootgpt.00000.work/"
let fileIP="https://file.00000.work:11001/test/upload" //上传文件的ip
let timeoutData=120000; //服务器超时时间一分钟
let noData={
    code:100,
    data:null,
    msg:"接口调用失败"
}

const requestData={
    ip(){
        console.log("获取ip：")
        return ip;
    },
    fileIp(){
        console.log("获取上传ip：")
        return fileIP;
    },
    async  get(url, data) { // 声明为一个异步函数
        try {
            let requestData = await axios.get(ip + url, { // 修改为正常的async/await调用方式
                params: data || null, // 使用params选项来传递查询参数
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
                },
                timeout: timeoutData // 设置请求超时时间为50秒
            });
            return requestData.data; // 返回请求得到的数据部分
        } catch (error) {
            //发生错误弹出提示
            ElementUI.Notification({
                type: 'error',
                message: '接口异常,请联系管理员!' + JSON.stringify(error)
            });
            console.error(error)
            return noData; // 如果请求失败，返回null或者其他适当的错误值
        }
    },

    async  postData(url, data) { // 声明为一个异步函数
        try {
            let requestData = await axios.post(ip + url, data || null, { // 修改为正常的async/await调用方式
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
                },
                timeout: timeoutData // 设置请求超时时间为50秒
            });
            return requestData.data; // 返回请求得到的数据部分
        } catch (error) {
            ElementUI.Notification({ // 修改为正确的ElementUI.Notification语法
                type: 'error',
                message: '接口异常,请联系管理员!' + JSON.stringify(error)
            });
            console.error(error)

            return noData; // 如果请求失败，返回null或者其他适当的错误值
        }
    }

}
// 向外暴露 request
export default requestData;