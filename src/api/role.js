import request from '../../utils/request.js'
// current: 1, size: 20
// 获取展示数据 system/role/search
const getRoleList = (data) => {
    return request({
        url: "system/role/search",
        method: "POST",
        data,
    })
}
// 随机获取 一组数据
const detailsList = (id) => {
    return request({
        url: `system/role/${id}`,
        method: "GET",
    })
}

// 添加数据
const AddList = (data) => {
    return request({
        url: "system/role",
        method: "POST",
        data,
    })
}

// 获取标签数据
const labelList = (id) => {
    return request({
        url: `/system/role/${id}`,
        method: "GET",
    })
}

// 删除

const handleDel = (id) => {
    return request({
        url: `system/role/${id}`,
        method:"DELETE"
        })
}

// 设置数据
const setEdit = () => {
    return request({
        url: `system/role`,
        method: "PUT",
    })
}

// 分配 权限
// system/menu/search
const distributeList = ()=>{
    return request({
        url: `system/menu/search`,
        method: "POST",
    })
}
// 

const distributeItem = (id) => {
    return request({
        url: `system/role/${id}/menu/ids`,
        method: "GET",
    })
}
export default {
    getRoleList,
    distributeList,
    distributeItem,
    handleDel,
    AddList,
    detailsList,
    labelList,
    setEdit,
}