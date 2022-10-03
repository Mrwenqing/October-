import request from '../../utils/request'

// 标签管理  article/label/search
const getLaberList = (data) => {
    return request({
        url: "article/label/search",
        method: "POST",
        data,
    })
}


// 添加数据
// article/category
const AddList = (data) => {
    return request({
        url: "article/label",
        method: "POST",
        data,
    })
}

// 获取 一条 数据
// EditList article/label/10
const EditList = (id) => {
    return request({
        url:`article/label/${id}`,
        method: "GET",
    })
}
// 设置数据article/label
const setEdit = () => {
    return request({
        url: `article/label`,
        method: "PUT",
    })
}
// 删除 article/label/10
const labelDel = (id) => {
    return request({
        url: `article/label/${id}`,
        method:"DELETE"
        })
}
export default {
    getLaberList,
    labelDel,
    AddList,
    EditList,
    setEdit

}