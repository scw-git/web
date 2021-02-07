// 方法一：用plugins文件
// import http from '@/plugins/axios/index.js'
// export default {
//     login: params => http.post('/login', params)
// }


// 方法二：不用plugins文件（如果配置多的话最好写个plugin文件）
import axios from 'axios'
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})
export default {
    getProductType: () => http.get('/productType'),
    getProduct: (params) => http.get('/product', params),
    getProductDetail: (params) => http.get('/productDetail', params),
    register: (params) => http.post('/register', params),
    userName: (params) => http.post('/userName', params),
    login: (params) => http.post('/login', params)

}

