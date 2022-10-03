import request from '../../utils/request'
// 分类

// 获取数据 
const getCategoryList = (data) => {
    return request({
        url: "article/category/search",
        method: "POST",
        data,
    })
}
// 添加数据  article/category
const AddList = (data) => {
    return request({
        url: "article/category",
        method: "POST",
        data,
    })
}

// 随机获取 一条 数据  获取 数据  
const EditList = (id) => {
    return request({
        url: `article/category/${id}`,
        method: "GET",
    })
}

// 设置数据 
const setEdit = () => {
    return request({
        url: `article/category`,
        method: "PUT",
    })
}
// 删除 
const categoryDel = (id) => {
    return request({
        url: `article/category/${id}`,
        method:"DELETE"
        })
}

export default {
    getCategoryList,
    categoryDel,
    AddList,
    EditList,
    setEdit
}