import request from '../../utils/request.js'

// 获取展示数据 article/article/search
const getArticleList = (data) => {
    return request({
        url: "article/article/search",
        method: "POST",
        data,
    })
}
// 随机获取 一组数据 article/article/15
const detailsList = (id) => {
    return request({
        url: `article/article/${id}`,
        method: "GET",
    })
}

// 获取标签数据 article/category/label/list
const labelList = () => {
    return request({
        url: "article/category/label/list",
        method: "GET",
    })
}

export default {
    getArticleList,
    detailsList,
    labelList,
}