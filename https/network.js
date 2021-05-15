const aes  = require('../https/aes');

/**
 * 基于Promise的网络请求库,包含GET POST请求，上传下载功能
 * 使用方法：
 * 先引入： import {get,post,...} from 本文件;
 * · get请求:    get("/index",{id:2}).then(data=>{}).catch(error=>{});
 * · post请求:    post("/index",{id:2}).then(data=>{}).catch(error=>{});
 * Promise详细介绍：
 * http://es6.ruanyifeng.com/#docs/promise
 */

/**
 * 发起get请求
 * @param url 请求路径 必填
 * @param data 请求参数 get请求的参数会自动拼到地址后面
 * @param headers 请求头 选填
 * @param IsDecrypt 解密 选填
 * @returns {Promise}
 */
export const get = (url, data, headers, IsDecrypt) => request('GET', url, data, headers, IsDecrypt);

/**
 * 发起post请求
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param headers 请求头 选填
 * @param IsDecrypt 解密 选填
 * @returns {Promise}
 */
export const post = (url, data, headers, IsDecrypt) => request('POST', url, data, headers, IsDecrypt);
/**
 * 发起put请求
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param headers 请求头 选填
 * @returns {Promise}
 */
export const put = (url, data, headers) => request('PUT', url, data, headers);
/**
 * 发起delete请求
 * @param url 请求路径 必填
 * @param data 请求参数 delete请求的参数会自动拼到地址后面
 * @param headers 请求头 选填
 * @returns {Promise}
 */
export const del = (url, data, headers) => request('DELETE', url, data, headers);

/**
 * 接口请求基类方法
 * @param method 请求方法 必填
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param header 请求头 选填
 * @param IsDecrypt 解密 选填
 * @returns {Promise}
 */
export function request(method, url, data, header = {'Content-Type': 'application/json'}, IsDecrypt = true) {
    console.group('==============>新请求<==============');
    console.info(method, url);
    if(data) console.info('参数：',data);
    return new Promise((resolve, reject) => {
        const response = {};
        wx.request({
            url, method, data, header,
            success: (res) => response.success = res.data,
            fail: (error) => response.fail = error,
            complete() {
                var res = "";
                if (response.success) {
                    console.info('请求成功：', response.success);
                    if(response.success.Success) {
                        if(IsDecrypt) {
                            res = aes.Decrypt(response.success.data)
                        } else {
                            res = response.success.data
                        }
                    } else {
                        console.info('请求成功，拉取数据失败：', response.success);
                    }
                    resolve(res)
                } else {
                    res = response.fail
                    console.info('请求失败：', res);
                    reject(res)
                }
                console.groupEnd();
            },
        });
    });
}