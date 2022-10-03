import request from '../../utils/request'

// 标签管理 
const getMenuList = () => {
    return request({
        // system/menu/search
        url: "system/menu/search",
        method: "POST",
    })
}
// 添加数据
const AddList = (data) => {
    return request({
        url: "article/category",
        method: "POST",
        data,
    })
}

// 获取 一条 数据
const EditList = (id) => {
    return request({
        url: `system/menu/${id}`,
        method: "GET",
    })
}
// 设置数据
const setEdit = () => {
    return request({
        url: `system/menu`,
        method: "PUT",
    })
}
// 删除
const labelDel = (id) => {
    return request({
        url: `system/menu/${id}`,
        method: "DELETE"
    })
}
export default {
    getMenuList,
    labelDel,
    AddList,
    EditList,
    setEdit

}