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
    login: (params) => http.post('/login', params),
    shoppingItem: (params) => http.post('/shoppingItem', params),
    getShoppingItem: (params) => http.get('/shoppingItem', params),
    updateShoppingItem: (params) => http.put('/updateShoppingItem', params),
    updateInventory: (params) => http.put('/updateInventory', params),//更新库存
    delShoppingItem: (params) => http.delete('/shoppingItem', params),
    delAllShoppingItem: () => http.get('/delAllShoppingItem'),//删除购物车中所有商品
    getUsers: (params) => http.get('/user', params),
    updatePw: (params) => http.put('/updatePw', params),
    address: (params) => http.post('/address', params),
    getAddress: (params) => http.get('/getAddress', params),
    order: (params) => http.post('/order', params),//提交（生成）订单
    getOrder: (params) => http.get('/getOrder', params),//提交（生成）订单
    updateOrder: (params) => http.put('/updateOrder', params),//更新支付状态订单
    delOrder: (params) => http.delete('/delOrder', params),//删除订单
    searchProduct: (params) => http.get('/searchProduct', params),//搜索商品接口
}

