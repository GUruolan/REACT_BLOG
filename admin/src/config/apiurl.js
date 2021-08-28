let ipurl = 'http://127.0.0.1:7001/admin/';
let service_path = {
    checklogin : ipurl + 'checklogin',
    getTypeInfo : ipurl + 'getypeinfo',
    addArticle : ipurl + 'addArticle',  //  添加文章
    updateArticle:ipurl + 'updateArticle'
}

export default service_path;