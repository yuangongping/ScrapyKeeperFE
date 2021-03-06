import { ApiFactory, requestMultipart } from '@/api/init';

//数据中心
export const apiDataCentral = new ApiFactory('data_central');
//邮件
export const apiEmail = new ApiFactory('email');
//节点
export const apiMachine = new ApiFactory('server_machine');
//ip代理
export const apiProxyIp = new ApiFactory('proxy_ip_agency');
//调度
export const apiScheduler = new ApiFactory('scheduler');
//日志分析
export const apiOriginalLog = new ApiFactory('original_log');



//模板
export const apiTemplate = new ApiFactory('template')
    //解析模板
apiTemplate.__proto__.parse = function(formData) {
        return new Promise((resolve, reject) => {
            requestMultipart
                .post("/template_parser", formData)
                .then(data => {
                    resolve(data)
                })
                .catch(e => {
                    console.error(e);
                    reject(e)
                });
        })
    }
    //添加模板
apiTemplate.__proto__.add = function(formData) {
    return new Promise((resolve, reject) => {
        requestMultipart
            .post("/template", formData)
            .then(data => {
                resolve(data)
            })
            .catch(e => {
                reject(e)
            })
    })
}