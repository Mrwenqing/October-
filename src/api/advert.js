import request from '../../utils/request.js'

// 文章管理
// 获取展示数据 article/advert/search
const getAbvertList = (data) => {
    return request({
        url: "article/advert/search",
        method: "POST",
        data,
    })
}
// 随机获取 一组数据 article/advert
const detailsList = (id) => {
    return request({
        url: `article/advert/${id}`,
        method: "GET",
    })
}

// 添加数据 article/advert
// article/category
const AddList = (data) => {
    return request({
        url: "article/advert",
        method: "POST",
        data,
    })
}

// 编辑 获取 数据
const EditList = (id) => {
    return request({
        url: `article/advert/${id}`,
        method: "GET",
    })
}

// 删除
const handleDel = (id) => {
    return request({
        url: `article/advert/${id}`,
        method:"DELETE"
        })
}

// 设置数据
const setEdit = () => {
    return request({
        url: `article/advert`,
        method: "PUT",
    })
}
export default {
    getAbvertList,
    AddList,
    EditList,
    handleDel,
    setEdit,
    detailsList,
   
}