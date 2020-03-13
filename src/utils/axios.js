// 引入axios
import axios from 'axios';
import qs from 'qs';

//axios.defaults.baseURL = 'http://mstest.pietian.com/api/';

// 设置默认请求头
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded'
};
// 请求拦截器
let cancel, promiseArr = {};
// 请求拦截器
axios.interceptors.request.use((config) => {
    // 发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消');
        promiseArr[config.url] = cancel;
    } else {
        promiseArr[config.url] = cancel;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
    return response;
}, (error) => {
    return Promise.resolve(error.response);
})

export default {
    // get请求
    async get(url, params) {
        // 获取token，加入Authrization
        const headers  = {};
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params,
                headers
            }).then(res => {
              console.log("get.res:",res);
                if (res && res.data) {
                  const resTemp = res.data;
                  if (resTemp && resTemp.code === 200) {
                    resolve(resTemp);
                  } else {
                    alert(resTemp.message);
                    reject(resTemp);
                  }
                }
            }).catch(e => {
              reject({ msg: '服务器异常，请稍后重试', code: 999, error: e })
            });
        });
    },
    // post请求
    async post(url, param) {
        // 获取token，加入Authrization
        const headers  = {};
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                headers,
                data: qs.stringify(param)
            }).then(res => {
              console.log("post.res:",res);
              if (res && res.data) {
                const resTemp = res.data;
                if (resTemp && resTemp.code === 200) {
                  resolve(resTemp);
                } else {
                  alert(resTemp.message);
                  reject(resTemp);
                }
              }
            }).catch(e => {
              reject({ msg: '服务器异常，请稍后重试', code: 999, error: e })
            });;
        });
    },

    // put请求
   async put(url, param) {
       // 获取token，加入Authrization
       const headers  = {};
        return new Promise((resolve, reject) => {
            axios({
                method: 'put',
                url,
                headers,
                data: qs.stringify(param)
            }).then(res => {
              console.log("put.res:",res);
              if (res && res.data) {
                const resTemp = res.data;
                if (resTemp && resTemp.code === 200) {
                  resolve(resTemp);
                } else {
                  alert(resTemp.message);
                  reject(resTemp);
                }
              }
            }).catch(e => {
              reject({ msg: '服务器异常，请稍后重试', code: 999, error: e })
            });;
        });
    },

    // del请求
    async del(url, param) {
        // 获取token，加入Authrization
        const headers  = {};
        return new Promise((resolve, reject) => {
            axios({
                method: 'delete',
                url,
                headers,
                data: qs.stringify(param)
            }).then(res => {
              if (res && res.data) {
                const resTemp = res.data;
                if (resTemp && resTemp.code === 200) {
                  resolve(resTemp);
                } else {
                  alert(resTemp.message);
                  reject(resTemp);
                }
              }
            }).catch(e => {
              reject({ msg: '服务器异常，请稍后重试', code: 999, error: e })
            });;
        });
    }
};
