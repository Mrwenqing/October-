import axios from 'axios'

let http = axios.create({
    baseURL:"http://base.2yuecloud.com/pro-api",
    timeout:3000,
})

http.interceptors.request.use((res) => {
    // res.headers.token=
    return Promise.resolve(res)
}, error => {
    return Promise.reject(error)
})

http.interceptors.response.use((res) => {
    return Promise.resolve(res)
}, error => {
    return Promise.reject(error)
})


export default http

